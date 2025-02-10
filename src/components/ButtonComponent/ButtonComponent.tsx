import React, { ReactNode, CSSProperties } from "react";

interface ButtonComponentProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  style?: CSSProperties;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  onClick,
  className = "",
  children,
  disabled = false,
  style = {},
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full lg:w-[210px] lg:text-[16px] lg:leading-[21.6px] font-medium lg:mb-12 lg:py-[15px] lg:px-[67px] md:px-7 md:py-3 border ${className}`}
      disabled={disabled}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
