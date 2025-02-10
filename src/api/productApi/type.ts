import { Category } from "../categoryApi/type";

export interface Product {
  id: string;
  name: string;
  urlName: string;
  picture: string;
  basePrice: number;
  discountPercentage: number;
  stock: number;
  description: string;
  createdAt: string;
  categories: Category[];
}

export interface ProductResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

export interface CreateProductPayload {
  name: string;
  basePrice: number;
  discountPercentage: number;
  stock: number;
  description: string;
  categories: string[];
}

export interface UpdateProductPayload {
  name: string;
  picture?: string;
  urlName?: string;
  basePrice: number;
  discountPercentage: number;
  stock: number;
  description: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

export interface ProductSearchParams {
  page: number;
  search?: string;
}

// Interface cho form input, bỏ các trường tự động sinh như id, urlName, createdAt
export interface ProductFormInput {
  name: string;
  picture?: string;
  basePrice: string;
  discountPercentage: string;
  stock: string;
  description: string;
  categories: string[];
}

export interface EditProductFormInput {
  name: string;
  basePrice: string;
  urlName?: string;
  picture?: string;
  discountPercentage: string;
  stock: string;
  description: string;
  categories: string[];
}

export interface SearchProps {
  onSearch: (value: string) => void;
  className?: string;
}
