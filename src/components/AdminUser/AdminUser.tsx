import React from "react";
import TableComponent from "../TableComponent/TableComponent";
import { Space } from "antd";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { UserDataType } from "../../api/userApi/type";
import { useSelector } from "react-redux";
import { UserState } from "../../redux/slides/userSlide";

const userData: UserDataType[] = [
  {
    key: "1",
    email: "datkhug133@gmail.com",
    name: "Phạm Quốc Đạt",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    email: "jimgreen@gmail.com",
    name: "Jim Green",
    address: "London No. 1 Lake Park",
  },
];

const AdminUser: React.FC = () => {
  const { t } = useTranslation();
  const user = useSelector((state: { user: UserState }) => state.user);
  console.log("user: ", user);

  const userColumns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: `${t("admin.admin-user.name")}`,
      dataIndex: "name",
      key: "name",
    },
    {
      title: `${t("admin.admin-user.address")}`,
      dataIndex: "address",
      key: "address",
    },
    {
      key: "action",
      render: () => (
        <Space size="middle">
          <a>
            <EditFilled />
          </a>
          <a>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-[20px] font-medium text-left lg:my-6">
        Authors Table
      </h1>
      <TableComponent<UserDataType>
        columns={userColumns}
        dataSource={userData}
      />
    </>
  );
};

export default AdminUser;
