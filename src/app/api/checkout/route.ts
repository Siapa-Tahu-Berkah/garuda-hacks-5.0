import { db } from "../../form/firebaseConfig";
import { getUserBasket, updateBasket } from "@/app/service/basket";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { midtransSnap } from "../config/midtrans";
import { NextResponse } from "next/server";

const getTransactionId = async (basketData: any, user_id: string) => {
  const strigifyData = JSON.stringify(basketData);
  const transaction = await addDoc(collection(db, "transaction"), {
    parchasing_data: strigifyData,
    user_id: user_id,
    type: "shop",
  });

  console.log("Transaction >>>>>>>>>>>", transaction.id);

  return transaction.id;
};

export const POST = async (req: Request) => {
  const body = await req.json();
  const { user_id } = body;

  const basket = await getUserBasket(user_id);

  const itemData = basket.map((data: any) => {
    return { price: data.price, name: data.name, quantity: data.taken_amount };
  });

  itemData.map(async (data: any) => {
    const itemDoc = doc(db, "items", data.item_id);

    await updateDoc(itemDoc, {
      amount: data.amount - data.taken_amount,
    });
  });

  const transaction = await getTransactionId(basket, user_id);
  console.log("checkout transaction >>>>>>>>>>>>>>>>", transaction);

  const gross_amount = basket
    .map((data: any) => {
      return data.price * data.taken_amount;
    })
    .reduce((sum: any, curr: any) => sum + curr);

  const bodySnap = {
    transaction_details: {
      order_id: transaction,
      gross_amount: gross_amount,
    },
    credit_card: {
      secure: true,
    },
    item_details: itemData,
    customer_details: {
      user_id: user_id,
    },
  };

  const token = await midtransSnap.createTransactionToken(bodySnap);

  return NextResponse.json(token);
};
