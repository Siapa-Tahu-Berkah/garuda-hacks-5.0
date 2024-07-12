"use client";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { getUserBasket } from "../service/basket";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const [user_id, setUserId] = useState<string | null>(null);
  const [basketItems, setBasketItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleIncrement = (index: number) => {
    setBasketItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].taken_amount = newItems[index].taken_amount +1;
      return newItems;
    });
  };

  const handleDecrement = (index: number) => {
    setBasketItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].taken_amount = newItems[index].taken_amount -1;
      return newItems;
    });
  };

  const handleCheckout = async () => {
    if (!user_id) return;

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id }),
    });

    const data = await response.json();

    if (data?.token) {
      window.snap.pay(data.token);
    }
  };

  useEffect(() => {
    setLoading(true);
    const id = Cookies.get("id");
    setUserId(id || null);

    if (id) {
      getUserBasket(id).then((items) => {
        const combinedItems = combineDuplicateItems(items);
        setBasketItems(combinedItems);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const combineDuplicateItems = (items: any[]) => {
    const itemMap: { [key: string]: any } = {};

    items.forEach((item) => {
      if (itemMap[item.item_id]) {
        itemMap[item.item_id].taken_amount += item.taken_amount;
      } else {
        itemMap[item.item_id] = { ...item };
      }
    });

    return Object.values(itemMap);
  };

  return (
    <div className="px-8 xl:px-0 py-8">
      <div className="max-w-6xl mx-auto w-full mb-8 bg-white px-8 py-4 shadow-md">
        <h1 className="text-3xl font-bold">Cart</h1>
      </div>

      <div className="max-w-6xl mx-auto w-full bg-white p-8 shadow-md">
        {loading ? (
          <p>Loading...</p>
        ) : user_id ? (
          basketItems.length > 0 ? (
            <>
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="text-left border-b">
                    <th className="px-6 py-3 text-base">Product</th>
                    <th className="px-6 py-3 text-sm">Price</th>
                    <th className="px-6 py-3 text-sm">Quantity</th>
                    <th className="px-6 py-3 text-sm">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {basketItems.map((item: any, index: number) => (
                    <tr className="border-b" key={item.item_id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-5">
                          <img
                            src={item.picture}
                            alt={item.name}
                            className="object-cover h-20 w-20 rounded-sm"
                          />
                          <p className="text-xl font-semibold">{item.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-base font-medium">
                        Rp. {formatPrice(parseInt(item.price.toString()))}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Button
                            className="px-3 h-10 bg-white rounded-none rounded-l-lg text-black border hover:text-white"
                            onClick={() => handleDecrement(index)}
                          >
                            -
                          </Button>
                          <div className="flex items-center justify-center w-10 h-10 border-t border-b">
                            {item.taken_amount}
                          </div>
                          <Button
                            className="px-3 h-10 bg-white rounded-none rounded-r-lg text-black border hover:text-white"
                            onClick={() => handleIncrement(index)}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-base font-medium">
                        Rp.{" "}
                        {formatPrice(
                          parseInt(item.price.toString()) * item.taken_amount
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-end">
                <Button className="px-6 py-2 bg-blue-600 text-white rounded-lg" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )
        ) : (
          <p>Please log in to view your cart.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
