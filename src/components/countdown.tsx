import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Countdown: NextPage = () => {
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date("7/26/2024 00:00:00");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const time = [days, hours, minutes, seconds];

  return (
    <div>
      {partyTime ? (
        <>
          <h1>Happy donate!</h1>
          <video autoPlay loop muted>
            <source src="/party.mp4" />
          </video>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center space-x-2">
            {time.map((t, index) => (
              <>
                <div
                  className="flex flex-col justify-center items-center"
                  key={index}
                >
                  <div className="mt-2 p-2 bg-[#C2D8B9] w-12 h-12 flex justify-center items-center">{t}</div>
                  <div className="label font-semibold">
                    {" "}
                    {index === 0
                      ? "days"
                      : index === 1
                      ? "hours"
                      : index === 2
                      ? "mins"
                      : "secs"}
                  </div>
                </div>
                {index < time.length - 1 && <span className="divider">:</span>}
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Countdown;
