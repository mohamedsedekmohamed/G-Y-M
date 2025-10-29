import React from 'react'
import { MdReportGmailerrorred } from "react-icons/md";


interface IconReportsProps {
  active?: boolean;
  className?: string;
}

const IconReports: React.FC<IconReportsProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <MdReportGmailerrorred size={24} color={iconColor} />
    </div>
  );
};



export default IconReports