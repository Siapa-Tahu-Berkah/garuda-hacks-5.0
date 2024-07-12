"use client";
import Card from "../../components/card";
import Chart from "../../components/chart";
import Countdown from "../../components/countdown";

const houseData = [
  {
    id: 1,
    houseUrl: "/image/workshop.jpg",
    type: "Workshop",
    description:
      "is an event aimed at helping underprivileged communities by making and selling crafts, which will later be led by the same community groups.",
  },
  {
    id: 2,
    houseUrl: "/image/medical_checkup.jpg",
    type: "Medical Check Up",
    description:
      "is a free event to help underprivileged and underprivileged communities check their health.",
  },
  {
    id: 3,
    houseUrl: "/image/makan.webp",
    type: "Free Food",
    description:
      "is an event that provides free meals with the aim of improving nutrition for underprivileged communities.",
  },
];

export default function Vote() {
  return (
    <div>
      <div className="mx-auto max-w-6xl pt-20 pb-28">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Let&apos;s Vote</h2>
          <p className="text-lg italic pt-3 pb-5">Your choice matters.</p>
        </div>
        <div className="my-6 border border-slate-500 rounded-3xl outline-double p-3 w-96 mx-auto">
          <p className="text-xl font-extrabold text-center">COUNTDOWN TIMER</p>
          <Countdown />
        </div>
        <div className="flex justify-center items-center py-8">
          <div className="grid grid-cols-3 gap-5">
            {houseData.map(({ id, houseUrl, type, description }) => (
              <Card
                key={id}
                houseUrl={houseUrl}
                type={type}
                description={description}
              />
            ))}
          </div>
        </div>
        <hr className="my-16 h-px border-slate-500" />
        <div className="text-center max-w-xl mx-auto py-6">
          <Chart />
        </div>
        <hr className="my-16 w-full h-px border-slate-500"></hr>
        <div className="text-center pb-10  p-8">
          <h2 className="text-3xl font-bold">Timeline</h2>
          <div className="max-w-6xl mx-auto w-100 flex">
            <div className="flex flex-col items-center w-1/3">
              <div className="relative w-full flex justify-center items-center mt-16">
                <div className="h-1 w-full bg-emerald-400"></div>
                <div className="absolute w-6 h-6 rounded-full bg-emerald-400 z-10 text-white text-center">
                  1
                </div>
              </div>
              <div className="w-72 h-20 bg-emerald-400 rounded-md p-4 mt-5">
                <h3 className="text-white text-xl font-semibold">
                  July 27, 2024
                </h3>
                <p className="text-gray-100 text-base font-semibold">
                  Workshop
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center w-1/3">
              <div className="relative w-full flex justify-center items-center mt-16">
                <div className="h-1 w-full bg-emerald-400"></div>
                <div className="absolute w-6 h-6 rounded-full bg-emerald-400 z-10 text-white text-center">
                  2
                </div>
              </div>
              <div className="w-72 h-20 bg-emerald-400 rounded-md p-4 mt-5">
                <h3 className="text-white text-xl font-semibold">
                  August 31, 2024
                </h3>
                <p className="text-gray-100 text-base font-semibold">
                  Medical Check Up
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center w-1/3">
              <div className="relative w-full flex justify-center items-center mt-16">
                <div className="h-1 w-full bg-emerald-400"></div>
                <div className="absolute w-6 h-6 rounded-full bg-emerald-400 z-10 text-white text-center">
                  3
                </div>
              </div>
              <div className="w-72 h-20 bg-emerald-400 rounded-md p-4 mt-5">
                <h3 className="text-white text-xl font-semibold">
                  September 14, 2024
                </h3>
                <p className="text-gray-100 text-base font-semibold">
                  Free Food
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
