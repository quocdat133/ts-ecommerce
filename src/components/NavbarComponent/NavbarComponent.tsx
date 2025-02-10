import { Menu } from "antd";
import {
  BilibiliOutlined,
  BranchesOutlined,
  DashboardOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useState } from "react";
import AdminUser from "../AdminUser/AdminUser";
import AdminProduct from "../AdminProduct/AdminProduct";
import AdminCategory from "../AdminCategory/AdminCategory";
import { useTranslation } from "react-i18next";
import Dashboard from "../Dashboard/Dashboard";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";

type MenuItem = Required<MenuProps>["items"][number];

const MenuComponent = () => {
  const { t } = useTranslation();
  const [keySelected, setKeySelected] = useState<string>("");
  const handleClickMenu = (e: { key: string }) => {
    setKeySelected(e.key);
  };

  const items: MenuItem[] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "product",
      icon: <ProductOutlined />,
      label: `${t("admin.product")}`,
    },
    {
      key: "category",
      icon: <BranchesOutlined />,
      label: `${t("admin.category")}`,
    },
    {
      key: "billing",
      icon: <BilibiliOutlined />,
      label: "Billing",
    },
    {
      key: "account-pages",
      label: "ACCOUNT PAGES",
      type: "group",
    },
    {
      key: "profile",
      icon: <ProductOutlined />,
      label: "Profile",
    },
  ];

  const renderPage = (key: string) => {
    switch (key) {
      case "dashboard":
        return <Dashboard />;
      case "billing":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "category":
        return <AdminCategory />;
      case "profile":
        return <ProfilePage />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <div className="flex overflow-hidden">
        {/* left */}
        <div className="lg:w-1/5 lg:ml-5 lg:mt-5 lg:px-5 lg:py-[13px]">
          <div className="flex px-4 py-3 items-center space-x-4 border-b-2 lg:mb-5">
            <img
              src="https://demos.creative-tim.com/muse-vue-ant-design-dashboard/images/logo-ct-black.png"
              alt="logo"
              className="lg:w-9 lg:h-[34px]"
            />
            <span className="text-[14px] font-sans font-medium text-[#8C8C8C]">
              Muse Dashboard
            </span>
          </div>
          <Menu
            onClick={handleClickMenu}
            mode="inline"
            defaultSelectedKeys={["user"]}
            style={{
              width: 256,
              height: "100%",
            }}
            items={items}
          />
        </div>
        {/* right */}
        <div className="w-full">
          <div className="flex-1 lg:py-[15px] lg:pl-0 lg:pr-[15px[">
            {renderPage(keySelected)}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuComponent;
