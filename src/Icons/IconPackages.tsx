  
import { VscLayersDot } from "react-icons/vsc";

interface IconPackagesProps {
  active?: boolean;
  className?: string;
}

const IconPackages: React.FC<IconPackagesProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <VscLayersDot size={24} color={iconColor} />
    </div>
  );
};
export default IconPackages