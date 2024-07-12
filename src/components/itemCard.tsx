import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ItemData } from "@/interface/ItemData";
import { useState } from "react";

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const ItemCard: React.FC<ItemData> = ({ id, name, amount, price, picture }) => {
  const [loading, setLoading] = useState(true);
  const formattedPrice = formatPrice(parseInt(price.toString()));

  return (
    <Card
      key={id}
      className="bg-white border-none rounded-none shadow-md transition-all duration-300 hover:scale-110 overflow-hidden"
    >
      <CardHeader className="relative">
        {loading && (
          <div className="w-full h-72 bg-gray-200 animate-pulse rounded-sm"></div>
        )}
        {picture && (
          <img
            src={picture}
            alt={name.toLowerCase()}
            className={`w-full h-72 object-cover rounded-sm transition-transform duration-300 ${loading ? "hidden" : "block"}`}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        )}
      </CardHeader>
      <CardContent className="text-[#4b4b4b]">
        <CardTitle className="capitalize text-lg font-medium">{name.toLowerCase()}</CardTitle>
        <CardDescription>Rp. {formattedPrice}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
