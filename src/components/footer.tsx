import Image from "next/image";

const data = [
  {
    image: "/image/paper.webp",
  },
  {
    image: "/image/wolframalpha.webp",
  },
  {
    image: "/image/hmif.webp",
  },
  {
    image: "/image/kitkat2.webp",
  },
  {
    image: "/image/multipolar.webp",
  },
  {
    image: "/image/champion-Logo.webp",
  },
  {
    image: "/image/xyz.webp",
  },
  {
    image: "/image/axure.webp",
  },
  {
    image: "/image/MSS.webp",
  },
  {
    image: "/image/tiket.webp",
  },
  {
    image: "/image/prima.webp",
  },
  {
    image: "/image/Caffino_logo.webp",
  },
  {
    image: "/image/velo.webp",
  },
  {
    image: "/image/mcdonalds.webp",
  },
  {
    image: "/image/lestari.webp",
  },
  {
    image: "/image/atwsolar.webp",
  },
  {
    image: "/image/jetbrains.webp",
  },
  {
    image: "/image/hacktiv8-dark.webp",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4">
      <h1 className="text-center text-4xl text-white font-bold mt-20 mb-12">Sponsored by</h1>
      <div className="mx-auto max-w-6xl grid grid-cols-3">
        {data.map((item: any, idx) => (
          <div key={idx} className="m-5 flex justify-center">
            <Image
              src={item.image}
              alt={`Image ${idx}`}
              width={150}
              height={150}
              className="w-44 h-40 object-contain"
            />
          </div>
        ))}
      </div>
      <div className="text-center text-white mt-4">
        &copy; 2024 Blessed | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
