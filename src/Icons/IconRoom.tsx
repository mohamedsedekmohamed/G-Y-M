  
import { FaPersonBooth } from "react-icons/fa";


interface IconRoomProps {
  active?: boolean;
  className?: string;
}

const IconRoom: React.FC<IconRoomProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <FaPersonBooth size={24} color={iconColor} />
    </div>
  );
};


export default IconRoom