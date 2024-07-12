"use client";

import React, { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { ItemData } from "@/interface/ItemData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { addItemToBasket } from "@/app/service/basket";

interface ShopDetailProps {
  product: ItemData;
}

const ShopDetail: React.FC<ShopDetailProps> = ({ product }) => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});

    return () => {
      Fancybox.destroy();
    };
  }, []);

  return (
    <div className="px-8 xl:px-0">
      <div className="max-w-6xl mx-auto w-full my-16 rounded-sm shadow-md bg-white p-8">
        <div className="flex flex-col lg:flex-row justify-center space-y-7 lg:space-y-0 lg:space-x-7 ">
          <Link
            href={product.picture}
            data-fancybox="gallery"
            data-caption={product.name}
          >
            <img
              src={product.picture}
              alt={product.name}
              className="w-full lg:w-[500px] object-cover cursor-pointer rounded-sm"
            />
          </Link>
          <div className="text-center lg:text-left lg:w-1/3">
            <div className="flex flex-row text-left justify-between lg:hidden">
              <div className="text-black">
                <h1 className="text-lg">{product.name}</h1>
                <p className="text-xl font-bold">Rp. {product.price}</p>
              </div>
              <div className="text-black">
                <p className="text-base font-semibold">Stock: {product.amount}</p>
                {parseInt(product.amount) <= 5 && (
                  <p className="text-sm font-medium text-red-500">*Low stock</p>
                )}
              </div>
            </div>

            <div className="hidden lg:flex lg:flex-col lg:space-y-1 text-black">
              <h1 className="text-xl font-bold">{product.name}</h1>
              <p className="text-2xl font-black">Rp. {product.price}</p>
              <p className="text-lg font-semibold">Stock: {product.amount}</p>
              {parseInt(product.amount) <= 5 && (
                <p className="text-sm font-medium text-red-500">*Low stock</p>
              )}
            </div>
            <Button className="w-full mt-5" onClick={addItemToBasket()}>Add To Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
