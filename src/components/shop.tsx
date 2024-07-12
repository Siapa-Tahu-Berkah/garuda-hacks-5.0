"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/form/firebaseConfig";
import { ItemData } from "@/interface/ItemData";
import { collection, getDocs } from "firebase/firestore";
import ItemCard from "@/components/itemCard";
import Link from "next/link";
import { Bars } from "react-loader-spinner";

const Shop = () => {
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedItems = await fetchItems();
      console.log(fetchedItems);
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const itemsData: ItemData[] = [];
    querySnapshot.forEach((doc) => {
      itemsData.push({ id: doc.id, ...doc.data() } as ItemData);
    });
    setItems(itemsData);
    return itemsData;
  };

  return (
    <>
      {loading && (
        <div className="min-h-[500px] flex justify-center items-center">
          <Bars
            height="80"
            width="80"
            color="#4b4b4b"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <Link key={item.id} href={`/shop/${item.id}`}>
              <ItemCard {...item} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Shop;
