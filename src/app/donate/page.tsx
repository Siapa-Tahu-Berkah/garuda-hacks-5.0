"use client";
import React, { useState } from "react";

const DonationPage: React.FC = () => {
  const [amount, setAmount] = useState("");

  const handlePresetAmount = (value: string) => {
    setAmount(value);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gray-100">
      <img src="/image/donate.png" className="absolute inset-0 w-full h-full object-cover z-0 blur-sm" alt="Donation background" />
      <div className="relative z-10 w-full max-w-md mx-auto bg-white bg-opacity-90 rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Make a Donation</h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Donation Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              placeholder="Enter amount"
            />
          </div>
          <div className="flex justify-between space-x-4">
            {["10", "15", "25"].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handlePresetAmount(value)}
                className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-md hover:bg-green-200 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                ${value}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationPage;