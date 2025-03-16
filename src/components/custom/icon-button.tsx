import React from "react";
import { LucideIcon } from "lucide-react";

type IconButtonProps = {
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  className,
  iconClassName,
}) => {
  return (
    <button className={`cursor-pointer ${className}`} onClick={onClick}>
      <Icon className={`${iconClassName}`} size={20} />
    </button>
  );
};

export default IconButton;
