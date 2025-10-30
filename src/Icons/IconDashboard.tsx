  
import { RiHome5Line } from "react-icons/ri";
interface IconDashboardsProps {
  active?: boolean;
  className?: string;
}

const IconDashboard: React.FC<IconDashboardsProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <RiHome5Line size={24} color={iconColor} />
    </div>
  );
};

export default IconDashboard