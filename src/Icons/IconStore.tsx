import React from 'react'
import { LuStore } from "react-icons/lu";

interface IconStoreProps {
  active?: boolean;
  className?: string;
}

const IconStore: React.FC<IconStoreProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <LuStore size={24} color={iconColor} />
    </div>
  );
};

export default IconStore