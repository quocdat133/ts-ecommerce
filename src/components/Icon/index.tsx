interface IconProps {
  icon: React.ReactNode;
  fontSize?: number;
  onClick?: () => void;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  icon,
  fontSize = 24,
  onClick,
  className,
  ...rest
}) => {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{ fontSize, cursor: onClick ? "pointer" : "default" }}
      {...rest}
    >
      {icon}
    </div>
  );
};

export default Icon;
