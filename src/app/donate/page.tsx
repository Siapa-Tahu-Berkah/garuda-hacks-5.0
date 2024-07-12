"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";

declare global {
  interface Window {
    snap: any;
  }
}

const DonationPage = (params: any) => {
  const [amount, setAmount] = useState("");
  const [snapToken, setSnapToken] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      console.log("Submitting donation of amount:", amount);
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donation_amount: amount,
        }),
      });

      if (response.ok) {
        const token = await response.json();
        console.log("Received token:", token);
        setSnapToken(token);
      } else {
        const errorData = await response.text();
        console.error("Failed to fetch the transaction token:", errorData);
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

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
          router.push("/voucher");
          console.log("Payment successful. Response:", res);
          try {
            // First, send the payment notification
            console.log("Sending payment notification...");
            // const notificationResponse = await fetch("/api/ticket/payment/notification", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify(res),
            // });
            // if (notificationResponse.ok) {
            //   console.log("Notification sent successfully");
            // } else {
            //   console.error("Failed to send notification. Status:", notificationResponse.status, "Error:", await notificationResponse.text());
            // }

            // console.log("Updating donation amount...");
            // const updateResponse = await fetch("/api/donate", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({ donation_amount: amount, action: "update_donation" }),
            // });

            // if (updateResponse.ok) {
            //   const result = await updateResponse.json();
            //   console.log("Donation updated. New total:", result.newAmount, "Donation number:", result.newDonationNumber);
            // } else {
            //   console.error("Failed to update donation amount. Status:", updateResponse.status, "Error:", await updateResponse.text());
            // }
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
  }, [snapToken, amount]);

  useEffect(() => {
    if (
      params.searchParams.order_id &&
      params.searchParams.status_code == "200" &&
      params.searchParams.transaction_status == "settlement"
    ) {
      router.push("/vote");
    }
  }, []);

  const handlePresetAmount = (value: string) => {
    setAmount(value);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gray-100">
      <img
        src="/image/donate.png"
        className="absolute inset-0 w-full h-full object-cover z-0 blur-sm"
        alt="Donation background"
      />
      <div className="relative z-10 w-full max-w-md mx-auto bg-white bg-opacity-90 rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Make a Donation
        </h2>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2">
              Donation Amount (Rp)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
              step="1000"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              placeholder="Enter amount in Rupiah"
            />
          </div>
          <div className="flex justify-between space-x-4">
            {["10000", "15000", "25000"].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handlePresetAmount(value)}
                className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-md hover:bg-green-200 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                Rp {new Intl.NumberFormat("id-ID").format(parseInt(value))}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationPage;
