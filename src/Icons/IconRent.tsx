import React from 'react'
import { BiChart } from "react-icons/bi";

interface IconRentProps {
  active?: boolean;
  className?: string;
}

const IconRent: React.FC<IconRentProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <BiChart size={24} color={iconColor} />
    </div>
  );
};


export default IconRent