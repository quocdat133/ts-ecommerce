import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, message } from "antd";
import { getProductById, updateProduct } from "../../api/productApi/productApi";
import {
  EditProductFormInput,
  Product,
  UpdateProductPayload,
} from "../../api/productApi/type";
import { useTranslation } from "react-i18next";
import HeaderComponent from "../../components/Header/HeaderComponent";

const schema = yup.object().shape({
  name: yup.string().required("Tên sản phẩm là bắt buộc"),
  basePrice: yup
    .string()
    .required("Giá sản phẩm là bắt buộc")
    .matches(/^\d+(\.\d{1,2})?$/, "Giá phải là số hợp lệ"),
  picture: yup.string().optional(),
  urlName: yup.string().optional(),
  discountPercentage: yup
    .string()
    .required("Discount là bắt buộc")
    .matches(/^\d+(\.\d{1,2})?$/, "Discount phải là số từ 0-100")
    .test("range", "Discount phải từ 0-100", (value) => {
      const num = parseFloat(value);
      return num >= 0 && num <= 100;
    }),
  stock: yup
    .string()
    .required("Số lượng là bắt buộc")
    .matches(/^\d+$/, "Số lượng phải là số nguyên"),
  description: yup.string().required("Mô tả sản phẩm là bắt buộc"),
  categories: yup
    .array()
    .of(yup.string().required())
    .required()
    .min(1, "Phải chọn ít nhất một danh mục"),
});

const EditProductPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProductFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productData] = await Promise.all([getProductById(id as string)]);
        setProduct(productData);
        // Đảm bảo chỉ lấy ID của categories

        reset({
          name: productData.name,
          basePrice: productData.basePrice.toString(),
          discountPercentage: productData.discountPercentage.toString(),
          stock: productData.stock.toString(),
          description: productData.description,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Không thể tải thông tin sản phẩm";
        message.error(errorMessage);
        navigate("/admin");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, reset, navigate]);

  const onSubmit = async (data: EditProductFormInput) => {
    if (!id) return;

    try {
      setIsLoading(true);
      const updateData: UpdateProductPayload = {
        name: String(data.name).trim(),
        basePrice: Number(data.basePrice),
        discountPercentage: Number(data.discountPercentage),
        stock: Number(data.stock),
        description: String(data.description).trim(),
      };

      await updateProduct(id, updateData);
      message.success("Cập nhật sản phẩm thành công!");
      navigate("/admin");
    } catch (error) {
      if (error instanceof Error) {
        message.error(`Lỗi: ${error.message}`);
      } else {
        message.error("Có lỗi xảy ra khi cập nhật sản phẩm");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderComponent />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {t("editProduct")}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-6 gap-4">
            <label className="col-span-2">
              {t("admin.admin-product.name")}
            </label>
            <div className="col-span-4">
              <input
                {...register("name")}
                className="w-full border rounded p-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <label className="col-span-2">
              {t("admin.admin-product.basePrice")}
            </label>
            <div className="col-span-4">
              <input
                {...register("basePrice")}
                className="w-full border rounded p-2"
                type="number"
              />
              {errors.basePrice && (
                <p className="text-red-500 text-sm">
                  {errors.basePrice.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <label className="col-span-2">
              {t("admin.admin-product.discountPercentage")}
            </label>
            <div className="col-span-4">
              <input
                {...register("discountPercentage")}
                className="w-full border rounded p-2"
                type="number"
                min="0"
                max="100"
              />
              {errors.discountPercentage && (
                <p className="text-red-500 text-sm">
                  {errors.discountPercentage.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <label className="col-span-2">
              {t("admin.admin-product.stock")}
            </label>
            <div className="col-span-4">
              <input
                {...register("stock")}
                className="w-full border rounded p-2"
                type="number"
                min="0"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm">{errors.stock.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <label className="col-span-2">
              {t("admin.admin-product.description")}
            </label>
            <div className="col-span-4">
              <textarea
                {...register("description")}
                className="w-full border rounded p-2"
                rows={4}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <Button onClick={() => navigate("/admin")}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProductPage;
