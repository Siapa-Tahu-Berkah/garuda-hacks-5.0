"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/../form/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import VoucherCard from "@/components/voucher/voucher";
import Popup from "@/components/popUpVoucher/popUpVoucher";

interface Voucher {
  id: string;
  image: string;
  title: string;
  brand: string;
  discount: string;
  description: string;
}

const Voucher: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchVouchers = async () => {
      const voucherCollection = collection(db, "voucher");
      const voucherSnapshot = await getDocs(voucherCollection);
      const voucherList = voucherSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Voucher)
      );
      setVouchers(voucherList);
    };

    fetchVouchers();
  }, []);

  const handleVoucherClick = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setShowPopup(true);
    setCopied(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedVoucher(null);
  };

  const handleCopyClick = () => {
    if (selectedVoucher) {
      navigator.clipboard.writeText(selectedVoucher.id);
      setCopied(true);
    }
  };

  return (
    <>
      <div className="bg-[#c2d8b9] h-48 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-center ">VOUCHER</h1>
        <p className="text-center font-light ">
        Get special vouchers & promo codes
        </p>
      </div>
      <div className="container max-w-6xl mb-20">
        <p className="my-2 mt-8">Find the best voucher collection here!</p>
        <div className=" mx-auto justify-center cursor-pointer items-center min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {vouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="transform transition-transform duration-300 hover:scale-105"
            >
              <VoucherCard
                image={voucher.image}
                title={voucher.title}
                brand={voucher.brand}
                discount={voucher.discount}
                description={voucher.description}
                onClick={() => handleVoucherClick(voucher)}
              />
            </div>
          ))}
        </div>
        {selectedVoucher && (
          <Popup
            show={showPopup}
            onClose={handleClosePopup}
            content={
              <div className="justify-center">
                <h2 className="text-lg font-bold">{selectedVoucher.title}</h2>
                <p>{selectedVoucher.description}</p>
                <img src="/image/qr.png" className="w-80 mx-auto mt-4" />
                <div className="flex items-center justify-center mt-2">
                  <button
                    onClick={handleCopyClick}
                    className={`px-2 py-1 text-sm rounded ${
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <p className="ml-2">{selectedVoucher.id}</p>
                </div>
              </div>
            }
          />
        )}
      </div>
    </>
  );
};

export default Voucher;
