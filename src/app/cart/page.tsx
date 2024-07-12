"use client";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { deleteBasket, getUserBasket, updateBasket } from "../service/basket";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Cart = (params?: any) => {
  const [user_id, setUserId] = useState<string | null>(null);
  const [basketItems, setBasketItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [snapToken, setSnapToken] = useState();
  const router = useRouter();

  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleIncrement = (index: number) => {
    updateBasket(basketItems[index].id, basketItems[index].taken_amount + 1);

    let newItems = [...basketItems];
    newItems[index].taken_amount += 1;

    setBasketItems(newItems);
  };

  const handleDecrement = (index: number) => {
    updateBasket(basketItems[index].id, basketItems[index].taken_amount - 1);

    let newItems = [...basketItems];
    newItems[index].taken_amount -= 1;

    setBasketItems(newItems);
  };

  const handleCheckout = async () => {
    if (!user_id) return;

    const response = await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      body: JSON.stringify({ user_id }),
    });

    const data = await response.json();

    setSnapToken(data);

    // if (data?.token) {
    //   window.snap.pay(data.token);
    // }
  };

  const getBasketData = () => {
    const id = Cookies.get("id");
    setUserId(id || null);

    if (id) {
      getUserBasket(id).then((items) => {
        // const combinedItems = combineDuplicateItems(items);
        setBasketItems(items);
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    const id = Cookies.get("id");
    setUserId(id || null);

    if (id) {
      getUserBasket(id).then((items) => {
        // const combinedItems = combineDuplicateItems(items);
        setBasketItems(items);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadSnap = () => {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute(
        "data-client-key",
        process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY as string
      );
      script.onload = () => {
        console.log("Snap.js loaded");
      };
      document.body.appendChild(script);
    };

    if (!window.snap) {
      loadSnap();
    }

    if (snapToken && window.snap) {
      console.log("Initializing Snap payment with token:", snapToken);
      window.snap.pay(snapToken, {
        onSuccess: async (res: any) => {
          console.log("Payment successful. Response:", res);
          try {
            // First, send the payment notification
            console.log("Sending payment notification...");
          } catch (error) {
            console.error("Error in onSuccess handler:", error);
            if (
              error instanceof TypeError &&
              error.message === "Failed to fetch"
            ) {
              console.error(
                "Network error or API route not accessible. Please check your server and network connection."
              );
            }
          }
        },
        onPending: (res: any) => {
          console.log("Payment pending. Response:", res);
        },
        onError: (err: any) => {
          console.error("Payment error. Error:", err);
        },
      });
    }
  }, [snapToken]);

  const handleDelete = async () => {
    await fetch("http://localhost:3000/api/cart", {
      method: "DELETE",
    });

    setBasketItems([]);
    await router.push("/shop");
  };

  useEffect(() => {
    if (
      params.searchParams.order_id &&
      params.searchParams.status_code == "200" &&
      params.searchParams.transaction_status == "settlement"
    ) {
      console.log("terhapus");
      handleDelete();
    }
  }, []);

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
                            onClick={() => handleDecrement(index)}>
                            -
                          </Button>
                          <div className="flex items-center justify-center w-10 h-10 border-t border-b">
                            {item.taken_amount}
                          </div>
                          <Button
                            className="px-3 h-10 bg-white rounded-none rounded-r-lg text-black border hover:text-white"
                            onClick={() => handleIncrement(index)}>
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
                <Button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={handleCheckout}>
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
