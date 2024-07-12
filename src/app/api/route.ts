import { NextResponse } from "next/server";
import { midtransSnap } from "./config/midtrans";

export const GET = async () => {
  return NextResponse.json("Masuk bang");
};

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { transaction_id, donation_amount } = body;

  const bodySnap = {
    transaction_details: {
      order_id: transaction_id,
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

    // customer_details: userData,
  };

  const token = await midtransSnap.createTransactionToken(bodySnap);

  return NextResponse.json(token);
}
