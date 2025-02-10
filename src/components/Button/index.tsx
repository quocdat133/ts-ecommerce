import React from "react";
import { Button } from "antd";

interface ButtonProps {
  type?: "primary" | "dashed" | "text" | "link";
  text: string;
  onClick?: () => void;
  className?: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  type,
  text,
  onClick,
  className,
  ...rests
}) => (
  <Button
    type={type}
    className={`${className} rounded-[62px]`}
    onClick={onClick}
    {...rests}
  >
    {text}
  </Button>
);

export default ButtonComponent;
