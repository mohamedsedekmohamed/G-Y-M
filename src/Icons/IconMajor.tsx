  
import { SiMainwp } from "react-icons/si";

interface IconMajorProps {
  active?: boolean;
  className?: string;
}

const IconMajor: React.FC<IconMajorProps    > = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <SiMainwp size={24} color={iconColor} />
    </div>
  );
};

export default IconMajor