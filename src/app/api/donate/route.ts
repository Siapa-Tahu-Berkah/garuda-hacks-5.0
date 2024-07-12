import { NextResponse } from "next/server";
import { midtransSnap } from "../config/midtrans";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../form/firebaseConfig";

export const GET = async () => {
  return NextResponse.json("Masuk bang");
};

const getTransactionId = async (data: any, user_id: string, message?: string) => {
  const strigifyData = JSON.stringify(data);
  const transaction = await addDoc(collection(db, "transaction"), {
    parchasing_data: strigifyData,
    user_id: user_id,
    type: "donation",
    message: message || null,
  });

  return transaction.id;
};

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { user_id, donation_amount, message } = body;

  const transaction = await getTransactionId(
    {
      price: donation_amount,
      name: "donation",
      quantity: 1,
    },
    user_id,
    message
  );

  const bodySnap = {
    transaction_details: {
      order_id: transaction,
      gross_amount: donation_amount,
    },
    credit_card: {
      secure: true,
    },
    item_details: [
      {
        price: donation_amount,
        name: "donation",
        quantity: 1,
      },
    ],
    customer_details: {
      user_id: user_id,
    },
  };

  const token = await midtransSnap.createTransactionToken(bodySnap);

  return NextResponse.json(token);
}