import { getUserBasket } from "@/app/service/basket";
import { NextResponse } from "next/server";

export const GET = async () => {
  const basket = await getUserBasket();
  return NextResponse.json(basket);
};
