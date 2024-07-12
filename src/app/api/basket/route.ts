import { getUserBasket } from "@/app/service/basket";
import { NextResponse } from "next/server";

export const GET = async () => {
  const basket = await getUserBasket("EzkTw31yWjMOZYqxzUhAWylytym1");
  return NextResponse.json(basket);
};
