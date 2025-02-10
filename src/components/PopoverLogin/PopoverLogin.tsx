import { useDispatch, useSelector } from "react-redux";
import { resetUser, UserState } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import * as userApi from "../../api/userApi/userApi";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Drawer, Popover } from "antd";
const PopoverLogin = () => {
  const { t } = useTranslation();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const user = useSelector((state: { user: UserState }) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await userApi.logoutUser();
      dispatch(resetUser());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      dispatch(resetUser());
      navigate("/");
    }
  };
  const handleClickNavigate = (type: string) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/admin");
    } else if (type === "home") {
      navigate("/");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
    setIsMobileMenuOpen(false);
  };

  const content = (
    <div className="flex flex-col space-y-2">
      <div
        className="hover:text-red-500 cursor-pointer py-2"
        onClick={() => handleClickNavigate("home")}
      >
        Trang chủ
      </div>
      <div
        className="hover:text-red-500 cursor-pointer py-2"
        onClick={() => handleClickNavigate("profile")}
      >
        {t("header.userProfile")}
      </div>
      {user?.role && (
        <div
          className="hover:text-red-500 cursor-pointer py-2"
          onClick={() => handleClickNavigate("admin")}
        >
          {t("header.systemManagement")}
        </div>
      )}
      <div
        className="hover:text-red-500 cursor-pointer py-2"
        onClick={() => handleClickNavigate("my-order")}
      >
        {t("header.myOrders")}
      </div>
      <div
        className="hover:text-red-500 cursor-pointer py-2"
        onClick={() => handleClickNavigate("")}
      >
        {t("header.logout")}
      </div>
    </div>
  );

  const mobileMenu = (
    <div className="flex flex-col space-y-4 p-4">
      {!user?.access_token && (
        <div
          className="hover:text-red-500 cursor-pointer py-2"
          onClick={() => navigate("/sign-in")}
        >
          {t("header.loginRegister")}
        </div>
      )}
      {user?.access_token && content}
      <div className="border-t pt-4">
        <LanguageSwitcher />
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center space-x-2">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <UserOutlined
            className="text-2xl"
            onClick={() => navigate("/sign-in")}
          />
        )}

        {user?.access_token ? (
          <Popover
            content={content}
            trigger="click"
            open={isOpenPopup}
            onOpenChange={setIsOpenPopup}
          >
            <div className="text-base hover:text-red-500 cursor-pointer truncate max-w-[150px]">
              {user.name?.length ? user?.name : user?.email}
            </div>
          </Popover>
        ) : (
          <div className="flex items-center space-x-4">
            <div
              className="hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/sign-in")}
            ></div>

            <div className="flex items-center hover:text-red-500">
              <div className="relative">
                <ShoppingCartOutlined className="text-2xl" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Mobile Menu Drawer */}
      <Drawer
        title={user?.name || t("header.menu")}
        placement="right"
        onClose={() => setIsMobileMenuOpen(false)}
        open={isMobileMenuOpen}
      >
        {mobileMenu}
      </Drawer>
    </div>
  );
};

export default PopoverLogin;
