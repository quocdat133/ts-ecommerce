import api from "../../config";
import { API_URL } from "../../contants/contants";
import { loginData, LoginResponse, userInfo } from "./type";

// Login user
export const loginUser = async (data: loginData): Promise<LoginResponse> => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during login");
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }
    await api.post("/logout", { refreshToken });
    // Clear local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  } catch (error) {
    console.error("Logout error:", error);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    throw error;
  }
};

// Get user details
export const getDetailsUser = async (): Promise<userInfo> => {
  try {
    const response = await api.get(`${API_URL}/user`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch user details: ${error.message}`);
    }
    throw new Error("An error occurred while fetching user details");
  }
};
