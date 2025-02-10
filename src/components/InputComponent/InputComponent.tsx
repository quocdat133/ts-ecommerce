import React from "react";
import { Input } from "antd";

export interface InputComponentProps {
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  allowClear?: boolean;
  isSearch?: boolean;
  defaultValue?: string;
  value?: string;
  icon?: React.ReactNode; // Thêm prop prefix
}

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  onChange,
  className,
  allowClear = true,
  defaultValue,
  value,
  icon, // Nhận prefix từ props
  ...rests
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    onChange(value);
  };

  return (
    <Input
      placeholder={placeholder}
      onChange={handleChange}
      className={className}
      allowClear={allowClear}
      defaultValue={defaultValue}
      value={value}
      prefix={icon}
      {...rests}
    />
  );
};

export default InputComponent;
