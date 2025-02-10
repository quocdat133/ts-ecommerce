import axios from "axios";
import { convertToUrlName } from "../../contants/contants";
import {
  CreateProductPayload,
  Product,
  ProductResponse,
  ProductSearchParams,
  UpdateProductPayload,
} from "./type";
import api from "../../config";

// Use the configured api instance instead of axiosJWT
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const updateProduct = async (
  id: string,
  productData: UpdateProductPayload
): Promise<Product> => {
  try {
    const response = await api.patch(`/product/${id}`, productData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
      }
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || "Dữ liệu không hợp lệ");
      }
      if (error.response?.status === 500) {
        console.error("Server error:", error.response.data);
        throw new Error("Lỗi server, vui lòng thử lại sau");
      }
      throw new Error(
        error.response?.data?.message || "Không thể cập nhật sản phẩm"
      );
    }
    throw new Error("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.");
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    if (!id) {
      throw new Error("Product ID is required.");
    }

    const response = await api.get(`/product/id/${id}`);

    if (!response.data) {
      throw new Error("Product not found");
    }

    const product: Product = {
      ...response.data,
      basePrice: Number(response.data.basePrice),
      discountPercentage: Number(response.data.discountPercentage),
      stock: Number(response.data.stock),
      categories: Array.isArray(response.data.categories)
        ? response.data.categories
        : [],
    };

    return product;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized access. Please login again.");
      }
      const errorMessage =
        error.response?.data?.message || "Failed to fetch product";
      console.error("Error fetching product:", errorMessage);
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const createProduct = async (
  productData: CreateProductPayload
): Promise<Product> => {
  try {
    if (!productData.categories || productData.categories.length === 0) {
      throw new Error("Categories is required");
    }

    const response = await api.post("/product", productData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to create product";
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const getProducts = async ({
  page,
  search,
}: ProductSearchParams): Promise<ProductResponse> => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  if (search) params.append("search", search);

  const response = await api.get(`/product?${params.toString()}`);

  if (Array.isArray(response.data)) {
    return {
      products: response.data,
      totalPages: 1,
      currentPage: page,
    };
  }
  return response.data;
};

export const searchProducts = async (
  searchText: string
): Promise<Product[]> => {
  try {
    const urlName = convertToUrlName(searchText);
    const response = await api.get(`/product/${urlName}`);
    return [response.data];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/product/${id}`);
};

export const updateProductPicture = async (
  id: string,
  pictureData: Forlgata
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  try {
    const response = await api.patch(`/product/picture/${id}`, pictureData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Server error details:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Lỗi cập nhật ảnh sản phẩm"
      );
    }
    throw error;
  }
};
