// "use client";

// import { notFound } from "next/navigation";
// import { getProductId } from "@/app/service/getProductId";
// import { ItemData } from "@/interface/ItemData";
// import { useEffect } from "react";
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";

// const ShopDetail = async ({
//   params,
// }: {
//   params: {
//     id: string;
//   };
// }) => {
//   const product: ItemData | null = await getProductId(params.id);

//   if (!product) {
//     notFound();
//   }

//   useEffect(() => {
//     Fancybox.bind("[data-fancybox]", {
//       // Opsional: konfigurasi tambahan
//     });

//     return () => {
//       Fancybox.destroy();
//     };
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto w-full my-20 px-8 xl:px-0">
//       <div className="flex justify-center">
//         <a href={product.picture} data-fancybox="gallery" data-caption={product.name}>
//           <img src={product.picture} alt={product.name} className="h-[300px] cursor-pointer" />
//         </a>
//       </div>
//       <div className="text-center mt-8">
//         <h1 className="text-3xl font-bold">{product.name}</h1>
//         {/* <p className="text-xl">{product.description}</p> */}
//         <p className="text-xl">Rp. {product.price}</p>
//       </div>
//     </div>
//   );
// };

// export default ShopDetail;

// file: app/shop/[id]/page.tsx
import { notFound } from "next/navigation";
import { getProductId } from "@/app/service/getProductId";
import ShopDetail from "@/components/shopDetail";
import { ItemData } from "@/interface/ItemData";

export default async function ShopDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product: ItemData | null = await getProductId(params.id);

  if (!product) {
    notFound();
  }

  return <ShopDetail product={product} />;
}

