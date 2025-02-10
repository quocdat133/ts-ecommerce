import React from "react";
import { Input } from "antd";
import Icon from "../Icon";

interface InputSearchProps {
  placehoder: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  size?: "small" | "middle" | "large";
}

const InputSearch: React.FC<InputSearchProps> = ({
  placehoder,
  className,
  onChange,
  size,
  icon,
  ...rests
}) => {
  return (
    <Input
      onChange={onChange}
      className={className}
      size={size}
      placeholder={placehoder}
      prefix={<Icon icon={icon} />}
      {...rests}
    />
  );
};

export default InputSearch;
