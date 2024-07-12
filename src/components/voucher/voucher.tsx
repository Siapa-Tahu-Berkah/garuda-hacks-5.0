import Image from "next/image";
interface VoucherProps {
    image: string;
    title: string;
    brand: string;
    discount: string;
    description: string;
    onClick: () => void;
  }
const VoucherCard: React.FC<VoucherProps> = ({
  image,
  title,
  brand,
  discount,
  description,
  onClick,
}) => {
    
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg w-64 min-h-[21rem]"onClick={onClick}>
      <img src={image} alt={title}  className="object-fit h-36 w-96 " />
      <div className="px-6 py-4">
        <div className="font-bold text-[#ff2d2d] text-lg mb-2">{title}</div>
        <p className="text-gray-700 text-base">{brand}</p>
        <p className=" font-bold text-2xl">{discount} </p>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default VoucherCard;
