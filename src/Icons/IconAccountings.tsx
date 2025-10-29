import React from 'react'
import { TfiWorld } from "react-icons/tfi";


interface IconAccountingsProps {
  active?: boolean;
  className?: string;
}

const IconAccountings: React.FC<IconAccountingsProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <TfiWorld size={24} color={iconColor} />
    </div>
  );
};
export default IconAccountings