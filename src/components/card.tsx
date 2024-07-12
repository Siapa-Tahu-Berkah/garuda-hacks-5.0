import Image from "next/image";
import { Button } from "@/components/ui/button";

const Card = ({
  voted,
  houseUrl,
  type,
  description,
  handleClick,
  activity_type,
}: {
  voted: boolean;
  houseUrl: string;
  type: string;
  description: string;
  handleClick: any;
  activity_type: string;
}) => {
  return (
    <>
      <div className="relative group" style={{ width: "90%" }}>
        <div>
          <Image
            src={houseUrl}
            alt={type}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          className="bg-black bg-opacity-60 absolute bottom-0 right-0 left-0 h-0 overflow-hidden 
        group-hover:h-full transition-all duration-500 flex justify-center items-center">
          <div className="text-center">
            <h3 className="text-white font-bold text-4xl text-center">
              {type}
            </h3>
            <p className="text-white italic text-base font-semibold px-10 pt-5 pb-10">
              {description}
            </p>
            {voted == false && (
              <Button
                onClick={() => handleClick(activity_type)}
                className="bg-white text-black rounded w-40 hover:bg-black hover:text-white">
                Vote
              </Button>
            )}
          </div>
        </div>
        <p className="text-center font-bold absolute top-[22.5rem] bottom-0 left-0 right-0">
          {type}
        </p>
      </div>
    </>
  );
};

export default Card;
