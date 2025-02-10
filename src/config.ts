import { jwtDecode, JwtPayload } from "jwt-decode";
import { API_URL } from "./contants/contants";
import axios from "axios";

export interface DecodedToken extends JwtPayload {
  id: string; // id luôn tồn tại trong token
  email?: string; // email có thể có hoặc không
  role?: string; // role có thể có hoặc không
}

export interface DecodedResult {
  decoded: DecodedToken | null;
  storageData: string | null;
}

const authConfig = {
  accessTokenKey: "access_token",
  refreshTokenKey: "refresh_token",
};

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const handleDecoded = (): DecodedResult => {
  const storageData = localStorage.getItem(authConfig.accessTokenKey);
  let decoded: DecodedToken | null = null;

  if (storageData) {
    try {
      decoded = jwtDecode<DecodedToken>(storageData);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  return { decoded, storageData };
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    return decoded.exp < Date.now() / 1000;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return true;
  }
};

export const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem(authConfig.refreshTokenKey);
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const res = await axios.post(`${API_URL}/refresh`, {
      token: refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = res.data;
    // Update both tokens in storage
    localStorage.setItem(authConfig.accessTokenKey, accessToken);
    localStorage.setItem(authConfig.refreshTokenKey, newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};

// Update interceptor to use the new token management
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(authConfig.accessTokenKey);
    if (!accessToken) {
      return config;
    }
    if (isTokenExpired(accessToken)) {
      const newToken = await refreshToken();
      if (newToken) {
        config.headers["Authorization"] = `Bearer ${newToken}`;
      } else {
        // Handle the case where refresh failed
        localStorage.removeItem(authConfig.accessTokenKey);
        localStorage.removeItem(authConfig.refreshTokenKey);
        window.location.href = "/sign-in"; // Redirect to login
      }
    } else {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } else {
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
