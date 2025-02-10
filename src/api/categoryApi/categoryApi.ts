import axios from "axios";
import api from "../../config";
import { Category, CreateCategoryPayload } from "./type";

// Cache for categories
let cachedCategories: Category[] | null = null;

export const getCategories = async (): Promise<Category[]> => {
  try {
    if (cachedCategories) {
      return cachedCategories;
    }

    const response = await api.get("/category");
    cachedCategories = response.data;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Không thể tải danh mục";
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const invalidateCategoriesCache = () => {
  cachedCategories = null;
};

export const createCategory = async (
categoryData: CreateCategoryPayload, token: string): Promise<Category> => {
  try {
    const response = await api.post("/category", categoryData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    invalidateCategoriesCache();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Không thể tạo danh mục";
      throw new Error(errorMessage);
    }
    throw new Error("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.");
  }
};

export const getCategoryById = async (id: string, token: string | null): Promise<Category> => {
  try {
    const response = await api.get(`/category/id/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Không thể lấy thông tin danh mục";
      throw new Error(errorMessage);
    }
    throw new Error("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.");
  }
};

export const updateCategory = async (
id: string, categoryData: CreateCategoryPayload, token: string): Promise<Category> => {
  try {
    const response = await api.patch(`/category/${id}`, categoryData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    invalidateCategoriesCache();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Không thể cập nhật danh mục";
      throw new Error(errorMessage);
    }
    throw new Error("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.");
  }
};

export const deleteCategory = async (id: string, token: string | null): Promise<void> => {
  try {
    await api.delete(`/category/${id}`);
    invalidateCategoriesCache();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Không thể xóa danh mục";
      throw new Error(errorMessage);
    }
    throw new Error("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.");
  }
};
