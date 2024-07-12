import { NextResponse } from "next/server";
import { midtransSnap } from "../config/midtrans";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../form/firebaseConfig";
import { cookies } from "next/headers";

export const GET = async () => {
  return NextResponse.json("API is working");
};

const getTransactionId = async (data: any) => {
  const stringifyData = JSON.stringify(data);
  const transaction = await addDoc(collection(db, "transaction"), {
    purchasing_data: stringifyData,
  });

  return transaction.id;
};

const updateDonationAmount = async (amount: number) => {
  try {
    const donationRef = doc(db, "donation", "AMp5gTnCEAGmB6iFnVLx");
    const donationSnap = await getDoc(donationRef);

    if (donationSnap.exists()) {
      const currentAmount = donationSnap.data()["donation amount"] || 0;
      const newAmount = currentAmount + amount;

      await updateDoc(donationRef, {
        donation_amount: newAmount,
      });

      console.log(`Donation updated. New total: ${newAmount}, Donation number: ${newDonationNumber}`);
      return NextResponse.json({ newAmount });
    } else {
      console.error("Donation document not found");
      throw new Error("Donation document not found");
    }
  } catch (error) {
    console.error("Error updating donation amount:", error);
    throw error;
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { donation_amount, action } = body;

    console.log("Received request:", { donation_amount, action });

    if (action === "update_donation") {
      try {
        const { newAmount, newDonationNumber } = await updateDonationAmount(parseInt(donation_amount));
        console.log("Donation updated successfully:", { newAmount, newDonationNumber });
        return NextResponse.json({ success: true, newAmount, newDonationNumber });
      } catch (error) {
        console.error("Error updating donation amount:", error);
        return NextResponse.json({ error: "Failed to update donation amount" }, { status: 500 });
      }
    }

    const userCookie = cookies().get('id');
    const user_id = userCookie ? userCookie.value : null;

    if (!user_id) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const transaction = await getTransactionId(
      {
        price: donation_amount,
        name: "donation",
        quantity: 1,
      }
    );

    console.log(`Transaction created with ID: ${transaction}`);

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

    const response = await midtransSnap.createTransaction(bodySnap);
    console.log("Midtrans Snap response:", response);
    return NextResponse.json(response.token);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
