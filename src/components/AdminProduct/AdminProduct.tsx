import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Select,
  Space,
  message,
  Modal,
  Pagination,
  Upload,
} from "antd";
import {
  DeleteOutlined,
  EditFilled,
  PlusOutlined,
  UploadOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TableComponent from "../TableComponent/TableComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import {
  createProduct,
  deleteProduct,
  getProducts,
  searchProducts,
  updateProductPicture,
} from "../../api/productApi/productApi";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../hooks/useDebounce";
import ProductSearch from "../SearchComponent/SearchComponent";
import { Category } from "../../api/categoryApi/type";
import { getCategories } from "../../api/categoryApi/categoryApi";
import {
  CreateProductPayload,
  Product,
  ProductFormInput,
} from "../../api/productApi/type";
import { API_URL } from "../../contants/contants";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import PopoverLogin from "../PopoverLogin/PopoverLogin";

const schema: yup.ObjectSchema<ProductFormInput> = yup.object().shape({
  name: yup.string().required("Tên sản phẩm là bắt buộc"),
  picture: yup.string().optional(),
  basePrice: yup
    .string()
    .required("Giá sản phẩm là bắt buộc")
    .matches(/^\d+(\.\d{1,2})?$/, "Giá phải là số hợp lệ"),
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
    .of(yup.string().optional())
    .required()
    .min(1, "Phải chọn ít nhất một danh mục"),
}) as yup.ObjectSchema<ProductFormInput>;

const AdminProduct: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { Option } = Select;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    // setValue,
    formState: { errors },
  } = useForm<ProductFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      picture: "",
      basePrice: "",
      discountPercentage: "",
      stock: "",
      description: "",
      categories: [],
    },
  });

  const debouncedSearchText = useDebounce(searchText, 1000);

  const fetchProducts = useCallback(async (page: number, search?: string) => {
    setIsLoadingProducts(true);
    try {
      if (search?.trim()) {
        const searchResults = await searchProducts(search.trim());
        setProducts(searchResults);
      } else {
        const response = await getProducts({ page });
        setProducts(response.products);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Không thể tải danh sách sản phẩm");
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value.trim()); // Thêm trim() ở đây
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, debouncedSearchText);
  }, [currentPage, debouncedSearchText, fetchProducts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (productId: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteProduct(productId);
          message.success("Đã xóa sản phẩm thành công");
          fetchProducts(currentPage, searchText);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          message.error("Không thể xóa sản phẩm");
        }
      },
    });
  };

  const handleEdit = (productId: string) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const handleImageUpload = async () => {
    if (!selectedProduct || !imageFile) return;

    try {
      const forlgata = new FormData();
      // Thử các key khác nhau tùy theo yêu cầu của backend
      forlgata.append("file", imageFile, imageFile.name); // hoặc
      await updateProductPicture(selectedProduct.id, forlgata);
      message.success("Cập nhật ảnh thành công");
      setIsImageModalOpen(false);
      setImageFile(null);
      fetchProducts(currentPage, searchText);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        console.error("Error headers:", error.response?.headers);
        message.error(
          `Upload failed: ${error.response?.data?.message || error.message}`
        );
      }
    }
  };

  // Fetch categories khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        message.error("Không thể tải danh mục sản phẩm");
      }
    };

    fetchCategories();
  }, []);

  const handleCancel = useCallback(() => {
    setIsOpenModal(false);
    // setPreviewImage("");
    reset();
  }, [reset]);

  const onSubmit = async (data: ProductFormInput) => {
    try {
      setIsLoading(true);
      const productPayload: CreateProductPayload = {
        name: data.name,
        basePrice: parseFloat(data.basePrice),
        discountPercentage: parseFloat(data.discountPercentage),
        stock: parseInt(data.stock),
        description: data.description,
        // picture: data.picture || "",
        categories: data.categories || [], // Mảng categories đang rỗng
      };
      await createProduct(productPayload);
      message.success("Sản phẩm đã được tạo thành công!");
      handleCancel();
      // Gọi lại fetchProducts để lấy danh sách mới nhất
      await fetchProducts(currentPage, searchText);
    } catch (error) {
      // Log chi tiết lỗi
      if (error instanceof Error) {
        console.error("Error details:", error.message);
        message.error(`Lỗi: ${error.message}`);
      } else {
        console.error("Unknown error:", error);
        message.error("Có lỗi xảy ra khi tạo sản phẩm");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchText]);

  const productColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: `${t("admin.admin-product.name")}`,
      dataIndex: "name",
      key: "name",
    },
    {
      title: `${t("admin.admin-product.image")}`,
      dataIndex: "picture",
      key: "picture",
      render: (picture: string, record: Product) => (
        <div className="relative group">
          {picture ? (
            <img
              src={`${API_URL}/${picture.split("/").pop()}`}
              alt="product"
              className="w-16 h-16 object-cover rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-400">
              {t("admin.admin-product.no-image")}
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center ">
            <Button
              icon={<CameraOutlined />}
              type="primary"
              onClick={() => {
                setSelectedProduct(record);
                setIsImageModalOpen(true);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      title: `${t("admin.admin-product.basePrice")}`,
      dataIndex: "basePrice",
      key: "basePrice",
      render: (price: number) => `${price.toLocaleString()}đ`,
    },

    {
      title: `${t("admin.admin-product.stock")}`,
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: `${t("admin.admin-product.discountPercentage")}`,
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (discount: number) => `${discount}%`,
    },
    {
      key: "action",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditFilled />}
            onClick={() => handleEdit(record.id)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      {/* header */}
      <div className="flex lg:my-[10px] lg:mr-[20px] lg:py-4 lg:pl-4 lg:pr-8">
        {/* left  */}
        <div className="lg:w-1/3">
          <p className="text-[14px]">
            <span className="text-[#8C8C8C]">Page /</span> <span>Product</span>
          </p>
          <p className="lg:mt-2 font-bold">Dashboard</p>
        </div>
        {/* right */}
        <div className="flex justify-end lg:w-2/3 space-x-5 items-center">
          <ProductSearch onSearch={handleSearch} className="max-w-lg" />
          <LanguageSwitcher />
          <PopoverLogin />
        </div>
      </div>

      {/* content */}
      <div className="p-4 bg-transparent border rounded-2xl mr-5">
        <div>
          <div className="flex space-x-14 items-center justify-between">
            <h2 className="lg:font-semibold my-5 lg:text-[20px]">
              Products Table
            </h2>
            <div className="mb-4">
              <Button
                onClick={() => setIsOpenModal(true)}
                style={{
                  height: "32px",
                  width: "100px",
                  borderStyle: "dashed",
                  borderRadius: "6px",
                }}
              >
                <PlusOutlined style={{ fontSize: "20px" }} />
              </Button>
            </div>
          </div>

          <TableComponent<Product>
            columns={productColumns}
            dataSource={products}
            pagination={false}
            loading={isLoadingProducts}
            rowKey="id" // Thêm prop rowKey
          />

          {/* Pagination */}
          <div className="mt-4 flex justify-end">
            <Pagination
              current={currentPage}
              total={totalPages * 10} // Assuming 10 items per page
              onChange={handlePageChange}
            />
          </div>

          {/* Image Upload Modal */}
          <Modal
            title="Cập nhật hình ảnh sản phẩm"
            open={isImageModalOpen}
            onCancel={() => {
              setIsImageModalOpen(false);
              setImageFile(null);
            }}
            onOk={handleImageUpload}
            okButtonProps={{ disabled: !imageFile }}
          >
            <Upload
              maxCount={1}
              beforeUpload={(file) => {
                const maxSize = 3 * 1024 * 1024; // 3MB
                const isValidType = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                ].includes(file.type);

                if (!isValidType) {
                  message.error(
                    "Chỉ chấp nhận file định dạng JPEG, JPG hoặc PNG"
                  );
                  return false;
                }

                if (file.size > maxSize) {
                  message.error("Kích thước file không được vượt quá 3MB");
                  return false;
                }

                // Create a new File object with a clean name
                const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "");
                const newFile = new File([file], cleanFileName, {
                  type: file.type,
                });
                setImageFile(newFile);
                return false;
              }}
              accept="image/jpeg,image/jpg,image/png"
              customRequest={() => {}} // Prevent default upload behavior
              onRemove={() => setImageFile(null)}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>

            {imageFile && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="max-w-xs"
                />
              </div>
            )}
          </Modal>
          <ModalComponent
            title="Tạo sản phẩm"
            isOpen={isOpenModal}
            onCancle={handleCancel}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
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
                  {t("admin.admin-product.discountPercentage")}(%)
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
                    <p className="text-red-500 text-sm">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4">
                <label className="col-span-2">Mô tả</label>
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

              <div className="grid grid-cols-6 gap-4">
                <label className="col-span-2">Danh mục</label>
                <div className="col-span-4">
                  <Controller
                    name="categories"
                    control={control}
                    render={({ field }) => (
                      <Select
                        mode="multiple"
                        className="w-full"
                        placeholder="Chọn danh mục"
                        {...field}
                        onChange={(value: string[]) => field.onChange(value)}
                      >
                        {categories &&
                          categories.map((category) => (
                            <Option key={category.id} value={category.id}>
                              {category.name}
                            </Option>
                          ))}
                      </Select>
                    )}
                  />
                  {errors.categories && (
                    <p className="text-red-500 text-sm">
                      {errors.categories.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? "Đang tạo..." : "Tạo sản phẩm"}
                </Button>
              </div>
            </form>
          </ModalComponent>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
