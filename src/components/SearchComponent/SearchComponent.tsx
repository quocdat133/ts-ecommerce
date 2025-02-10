import React from "react";
import { useTranslation } from "react-i18next";
import { SearchProps } from "../../api/productApi/type";
import InputComponent from "../InputComponent/InputComponent";
import { SearchOutlined } from "@ant-design/icons";

const ProductSearch: React.FC<SearchProps> = ({ onSearch, className }) => {
  const { t } = useTranslation();

  return (
    <InputComponent
      placeholder={t("header.search")}
      onChange={onSearch}
      className={className}
      icon={<SearchOutlined />}
    />
  );
};

export default ProductSearch;
