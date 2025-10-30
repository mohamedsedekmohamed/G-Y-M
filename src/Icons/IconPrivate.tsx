  
import { MdPrivacyTip } from "react-icons/md";

interface IconPrivateProps {
  active?: boolean;
  className?: string;
}

const IconPrivate: React.FC<IconPrivateProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <MdPrivacyTip size={24} color={iconColor} />
    </div>
  );
};


export default IconPrivate