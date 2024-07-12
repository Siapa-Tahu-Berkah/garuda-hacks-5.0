"use client";
import { useEffect, useState } from "react";
declare global {
  interface Window {
    snap: any;
  }
}

const Payment = () => {
  const [snapToken, setSnapToken] = useState();
  const onSubmit = async () => {
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      body: JSON.stringify({
        transaction_id: "aoofijsfjidfpojdfd2324fkdo",
        donation_amount: 1000,
      }),
    });

    const token = await response.json();

    setSnapToken(token);
  };

  useEffect(() => {
    const loadSnap = () => {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute(
        "data-client-key",
        process.env.MIDTRANS_CLIENT_KEY as string
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
      window.snap.pay(snapToken, {
        onSuccess: async (res: any) => {
          await fetch(
            process.env.NEXT_PUBLIC_API_URL +
              "/api/ticket/payment/notification",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(res),
            }
          );
          console.log("berhasil");
        },
        onPending: (res: any) => {
          console.log("pending");
        },
        onError: (err: any) => {
          console.log("Error");
        },
      });
    }
  }, [snapToken]);

  return (
    <>
      <button onClick={() => onSubmit()}>Pay</button>
    </>
  );
};

export default Payment;
