 
import { CiUser } from "react-icons/ci";

interface IconUsersProps {
  active?: boolean;
  className?: string;
}

const IconUsers: React.FC<IconUsersProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <CiUser size={24} color={iconColor} />
    </div>
  );
};

export default IconUsers;
