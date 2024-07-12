import { getUserBasket } from "@/app/service/basket";
import { NextResponse } from "next/server";

export const GET = async () => {
  const basket = await getUserBasket("r3V46D3iI3Oq83Yoq0JxM8BDqco2");
  return NextResponse.json(basket);
};
