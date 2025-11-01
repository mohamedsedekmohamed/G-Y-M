import { FaMoneyCheckAlt } from "react-icons/fa";

interface IconPaymentProps {
  active?: boolean;
  className?: string;
}

const IconPayment: React.FC<IconPaymentProps> = ({ active = false, className = "" }) => {
  const iconColor = active ? "#67B96D" : "#CCCCCC";

  return (
    <div className={className}>
      <FaMoneyCheckAlt size={24} color={iconColor} />
    </div>
  );
};
export default IconPayment