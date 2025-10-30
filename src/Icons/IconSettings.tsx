  
import { FiSettings } from "react-icons/fi";

interface IconSettingProps {
  active?: boolean;
  className?: string;
}

const IconSettings: React.FC<IconSettingProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <FiSettings size={24} color={iconColor} />
    </div>
  );
};

export default IconSettings