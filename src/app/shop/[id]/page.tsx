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

