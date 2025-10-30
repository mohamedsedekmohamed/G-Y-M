  
import { LiaBusinessTimeSolid } from "react-icons/lia";

interface IconAttendanceProps {
  active?: boolean;
  className?: string;
}

const IconAttendance: React.FC<IconAttendanceProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <LiaBusinessTimeSolid size={24} color={iconColor} />
    </div>
  );
};


export default IconAttendance