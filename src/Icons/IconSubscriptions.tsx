  
import { RiUserFollowFill } from "react-icons/ri";

interface IconSubscriptionsProps {
  active?: boolean;
  className?: string;
}

const IconSubscriptions :React.FC<IconSubscriptionsProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <RiUserFollowFill size={24} color={iconColor} />
    </div>
  );
};

export default IconSubscriptions