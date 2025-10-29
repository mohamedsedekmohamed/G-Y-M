import React from 'react'
import { GrRun } from "react-icons/gr";

interface IconClassesProps {
  active?: boolean;
  className?: string;
}

const IconClasses: React.FC<IconClassesProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <GrRun size={24} color={iconColor} />
    </div>
  );
};

export default IconClasses