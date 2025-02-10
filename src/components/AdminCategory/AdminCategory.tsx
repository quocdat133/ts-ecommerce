import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Modal, Space, message } from "antd";
import { DeleteOutlined, EditFilled, PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../../api/categoryApi/categoryApi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Category, CategoryFormInput } from "../../api/categoryApi/type";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import PopoverLogin from "../PopoverLogin/PopoverLogin";

const schema = yup.object().shape({
  name: yup.string().required("Tên danh mục là bắt buộc"),
});

const AdminCategory: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormInput>({
    resolver: yupResolver(schema),
  });

  const handleAuthError = useCallback(() => {
    message.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
    navigate("/sign-in");
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      message.error("Không thể tải danh sách danh mục");
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCancel = useCallback(() => {
    setIsOpenModal(false);
    setIsEditMode(false);
    setSelectedCategory(null);
    reset();
  }, [reset]);

  const handleEdit = async (category: Category) => {
    try {
      const token = localStorage.getItem("access_token");
      const categoryData = await getCategoryById(category.id, token);
      setSelectedCategory(categoryData);
      setValue("name", categoryData.name);
      setIsEditMode(true);
      setIsOpenModal(true);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Phiên đăng nhập đã hết hạn")) {
          handleAuthError();
          return;
        }
        message.error(error.message);
      } else {
        message.error("Không thể tải thông tin danh mục");
      }
      console.error("Failed to fetch category details:", error);
    }
  };

  const handleDelete = async (category: Category) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa danh mục "${category.name}"?`,
      onOk: async () => {
        try {
          const token = localStorage.getItem("access_token");
          await deleteCategory(category.id, token);
          message.success("Đã xóa danh mục thành công!");
          fetchCategories();
        } catch (error) {
          if (error instanceof Error) {
            if (error.message.includes("Phiên đăng nhập đã hết hạn")) {
              handleAuthError();
              return;
            }
            message.error(error.message);
          } else {
            message.error("Không thể xóa danh mục");
          }
          console.error("Failed to delete category:", error);
        }
      },
    });
  };

  const onSubmit = async (data: CategoryFormInput) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("access_token");

      if (!token) {
        message.error("Bạn cần đăng nhập lại để thực hiện thao tác này");
        navigate("/sign-in");
        return;
      }

      if (isEditMode && selectedCategory) {
        await updateCategory(selectedCategory.id, { name: data.name }, token);
        message.success("Danh mục đã được cập nhật thành công!");
      } else {
        await createCategory({ name: data.name }, token);
        message.success("Danh mục đã được tạo thành công!");
      }
      handleCancel();
      fetchCategories();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Phiên đăng nhập đã hết hạn")) {
          handleAuthError();
          return;
        }
        message.error(error.message);
      } else {
        message.error("Có lỗi xảy ra khi xử lý yêu cầu");
      }
      console.error("Error details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const categoryColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: `${t("admin.admin-category.name")}`,
      dataIndex: "name",
      key: "name",
    },
    {
      title: `${t("admin.admin-category.action")}`,
      key: "action",
      render: (record: Category) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditFilled />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
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
            <span className="text-[#8C8C8C]">Page /</span> <span>Category</span>
          </p>
          <p className="lg:mt-2 font-bold">Dashboard</p>
        </div>
        {/* right */}
        <div className="flex justify-end lg:w-2/3 space-x-5 items-center">
          <LanguageSwitcher />
          <PopoverLogin />
        </div>
      </div>
      <div className="p-4 bg-transparent border rounded-2xl mr-5">
        <div className="flex space-x-14 items-center justify-between">
          <h2 className="lg:font-semibold my-5 lg:text-[20px]">
            Categories Table
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

        <TableComponent<Category>
          columns={categoryColumns}
          dataSource={categories}
        />

        <ModalComponent
          title={isEditMode ? "Cập nhật danh mục" : "Tạo danh mục"}
          isOpen={isOpenModal}
          onCancle={handleCancel}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-6 gap-4">
              <label className="col-span-2">
                {t("admin.admin-category.name")}
              </label>
              <div className="col-span-4">
                <input
                  {...register("name")}
                  className="w-full border rounded p-2"
                  placeholder="Nhập tên danh mục"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                {isLoading
                  ? isEditMode
                    ? "Đang cập nhật..."
                    : "Đang tạo..."
                  : isEditMode
                  ? "Cập nhật"
                  : "Tạo danh mục"}
              </Button>
            </div>
          </form>
        </ModalComponent>
      </div>
    </div>
  );
};

export default AdminCategory;
