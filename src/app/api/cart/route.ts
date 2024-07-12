import { deleteBasket } from "@/app/service/basket";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const DELETE = async () => {
  const userCookie = cookies().get("id");
  const user_id = userCookie ? userCookie.value : null;

  console.log("api user id", user_id);
  await deleteBasket(user_id || "");

  return NextResponse.json("deleteBasket");
};
