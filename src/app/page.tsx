"use client";
import * as React from "react";
import Image from "next/image";
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

export default function Home() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-32 ">
      <div className="z-10 w-full items-center justify-between">
        <div className="relative h-96">
          <Image
            src={village}
            alt="Donation"
            layout="fill"
            objectFit="cover"
            className="brightness-[0.6]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
            <h2 className="text-white text-4xl font-bold">
              Let&apos;s Donate!
            </h2>

            <h4 className="text-white text-center text-xl font-normal">
              Create your own happiness to keep you at peace
            </h4>
            <div className="flex space-x-4 pt-4">
              <Button className="bg-blue-600 hover:bg-blue-600 text-white">
                Donate
              </Button>
              <Button variant="outline">Documentation</Button>
            </div>
          </div>
        </div>
        <div className="bg-emerald-300 p-4 flex flex-col sm:flex-row justify-center items-center">
          <div className="text-center mx-20">
            <FaPeopleCarryBox className="inline-block text-3xl" />
            <p className="text-sm font-medium">Total donator: xxx</p>
          </div>
          <div className="w-full sm:w-px h-[0.5px] sm:h-9 my-5 sm:my-0 bg-black"></div>
          <div className="text-center mx-20">
            <GiReceiveMoney className="inline-block text-3xl" />
            <p className="text-sm font-medium">Total donation: xxx</p>
          </div>
          <div className="w-full sm:w-px h-[0.5px] sm:h-9 my-5 sm:my-0 bg-black"></div>
          <div className="text-center mx-20">
            <FaPeopleRoof className="inline-block text-3xl" />
            <p className="text-sm font-medium">Total helped: xx</p>
          </div>
        </div>
        <div className="space-y-4 max-w-6xl mx-auto px-8 xl:px-0">
          <h3 className="text-2xl font-bold mt-12 text-center sm:text-left">
            Hello
          </h3>
          <div className="flex flex-col sm:flex-row space-y-7 sm:space-y-0 sm:space-x-7">
            <div className="w-full sm:w-2/5 p-5 border border-gray-200 rounded-lg shadow">
              <h4 className="text-xl font-semibold mb-3">Your Mission</h4>
              <div className="space-y-4">
                <div className="p-5 border-gray-300 rounded-lg bg-gray-50">
                  <p className="text-sm font-semibold text-gray-600">
                    Donation
                  </p>
                </div>
                <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <p className="text-sm font-semibold text-gray-600">
                    Purchased
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-3/5 space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg shadow">
                <h4 className="text-xl font-semibold mb-2">Current XP</h4>
                <div className="w-full">
                  <Progress value={progress} />
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
