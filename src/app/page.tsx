"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import village from "@/assets/village.webp";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FaPeopleCarryBox, FaPeopleRoof } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import Lottie from "lottie-react";
import animationData1 from "@/assets/donation-animation.json";
import animationData2 from "@/assets/good-animation.json";
import { initializeApp } from "firebase/app";
import Shop from "@/components/shop";
import Cookies from "js-cookie";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./form/firebaseConfig";

export default function Home() {
  const [progress, setProgress] = React.useState(13);
  const [user_id, setUserId] = React.useState<string | null>(null);
  const [user_name, setUserName] = React.useState<string | null>("");
  const [userData, setUser] = React.useState<any>({});

  const getUser = async () => {
    const user_id = Cookies.get("id");
    const user_name = Cookies.get("name");
    setUserId(user_id || null);
    setUserName(user_name || null);
    if (user_id) {
      const userDoc = doc(db, "users", user_id);
      const snapShotUser = await getDoc(userDoc);
      const user = snapShotUser.data();
      console.log(user);
      setUser(user || "");
    }

    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  };

  React.useEffect(() => {
    getUser();
    // const timer = setTimeout(() => setProgress(66), 500);
    // return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-32 ">
      <div className="z-10 w-full items-center justify-between">
        <div className="relative h-[33rem]">
          <Image
            src={village}
            alt="village"
            layout="fill"
            objectFit="cover"
            className="brightness-[0.6] opacity-80"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
            <h2 className="text-white text-4xl font-bold">
              Let&apos;s Donate!
            </h2>
            <h4 className="text-white text-center text-xl font-normal">
              Create your own happiness to keep you at peace
            </h4>
            <div className="flex space-x-4 pt-4">
              <Button className="bg-blue-600 hover:bg-white text-white hover:text-blue-600 opacity-95">
                <Link href="/donate">Donate</Link>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 opacity-80 w-full bg-[#17c3b2] p-4 flex flex-col sm:flex-row justify-center items-center">
            <div className="text-center mx-20">
              <FaPeopleCarryBox className="inline-block text-3xl" />
              <p className="text-sm font-bold">Donator: 1000+</p>
            </div>
            <div className="w-full sm:w-px h-[0.5px] sm:h-9 my-5 sm:my-0 bg-black"></div>
            <div className="text-center mx-20">
              <GiReceiveMoney className="inline-block text-3xl" />
              <p className="text-sm font-bold">Donation: IDR 20M++</p>
            </div>
            <div className="w-full sm:w-px h-[0.5px] sm:h-9 my-5 sm:my-0 bg-black"></div>
            <div className="text-center mx-20">
              <FaPeopleRoof className="inline-block text-3xl" />
              <p className="text-sm font-bold">Helped: 1500+</p>
            </div>
          </div>
        </div>
        <div className="space-y-4 max-w-6xl mx-auto px-8 xl:px-0">
          <h3 className="text-2xl font-bold mt-12 text-center sm:text-left">
            Hello, {user_name || "Guest"}!
          </h3>
          <div className="flex flex-col sm:flex-row space-y-7 sm:space-y-0 sm:space-x-7">
            <div className="w-full sm:w-2/5 p-5 border border-gray-200 rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-3">Your Mission</h4>
              <div className="space-y-4">
                <div className="p-5 border-gray-300 rounded-lg bg-[#ced4da] opacity-90">
                  <p className="text-sm font-semibold">Donation</p>
                </div>
                <div className="p-4 border-gray-300 rounded-lg bg-[#ced4da] opacity-90">
                  <p className="text-sm font-semibold">Purchased</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-3/5 space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg shadow flex justify-between items-center">
                <div className="flex flex-col">
                  <h4 className="text-xl font-semibold mb-2">Your Point:</h4>
                  <div className="w-full flex space-x-1">
                    <h1 className="font-bold text-4xl">
                      {userData?.point || 0}
                    </h1>
                  </div>
                </div>
                <div className="">
                  <Link href="/voucher">
                    <Button className="bg-blue-600 hover:bg-blue-800 transition-all duration-300">
                      Claim Vouchers
                    </Button>
                  </Link>
                </div>
              </div>
              <p className="text-sm text-center sm:text-left text-gray-400">
                It is very important to know who you are. To make decisions. To
                show who you are.
              </p>
              <div className="flex justify-center sm:justify-normal">
                <div>
                  <Lottie animationData={animationData1} className="w-36" />
                  <p className="text-center text-sm font-medium">Generous</p>
                </div>
                <div>
                  <Lottie
                    animationData={animationData2}
                    className="w-14 mt-6"
                  />
                  <p className="text-center text-sm font-medium">Kindness</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl w-full px-8 xl:px-0 mx-auto" id="shop">
        <div className="h-px w-full bg-black my-16"></div>
        <div className="w-full">
          <h2 className="text-black text-2xl font-bold mb-4 text-center sm:text-left">
            Shop
          </h2>
        </div>
      </div>
      <div className="max-w-6xl px-8 xl:px-0 mx-auto">
        <Shop />
      </div>
    </main>
  );
}
