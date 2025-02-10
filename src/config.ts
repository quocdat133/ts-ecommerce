import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: `${process.env.API_URL}`,
  timeout: 10000, // thời gian tối đa axios chờ response (10s)
});

const authConfig = {
  accessTokenKey: "access_token",
  refreshTokenKey: "refresh_token",
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    else return decoded.exp < Date.now() / 1000;
  } catch (error) {
    console.log(error);
    return true;
  }
};

const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem(authConfig.refreshTokenKey);
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const res = await axios.post(`${process.env.API_URL}/refresh`, {
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

// auto create access_token when access_token is expired 
api.interceptors.response.use(
  // if response is success
  (response) => response,
  // response fail
  async (error) => {
    const originalRequest = error.config;
    // check 401 error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // prevent request retry multiple 
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
