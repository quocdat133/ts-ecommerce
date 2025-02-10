import React, { useState } from "react";
import { GlobalOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const currentLanguage = i18n.language;

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsPopoverOpen(false);
  };

  const content = (
    <div className="py-1">
      <div
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleLanguageChange("en")}
      >
        English
      </div>
      <div
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleLanguageChange("vi")}
      >
        Tiếng Việt
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
      placement="bottom"
    >
      <div className="flex items-center cursor-pointer hover:text-red-500">
        <GlobalOutlined className="text-xl" />
        <span className="ml-1">{currentLanguage === "en" ? "EN" : "VN"}</span>
        <CaretDownOutlined className="ml-1 text-xs" />
      </div>
    </Popover>
  );
};

export default LanguageSwitcher;
