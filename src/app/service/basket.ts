import { db } from "../form/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const addItemToBasket = async (user_id?: string, item_id?: string, quantity?: number) => {
  await addDoc(collection(db, "user_basket"), {
    user_id: user_id,
    item_id: item_id,
    taken_amount: quantity || 1,
  });
};

export const updateBasket = async (basket_id: string, quantity?: number) => {
  const basketDoc = doc(db, "user_basket", basket_id);
  if (quantity !== 0) {
    await updateDoc(basketDoc, {
      taken_amount: quantity,
    });
  } else {
    await deleteDoc(basketDoc);
  }
};

export const getUserBasket = async (user_id?: string) => {
  const queryDoc = query(
    collection(db, "user_basket"),
    where("user_id", "==", user_id)
  );

  const snapShot = await getDocs(queryDoc);

  const basket = snapShot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const itemPromises = basket.map((data) =>
    getDoc(doc(db, "items", data.item_id))
  );

  const itemSnapshots = await Promise.all(itemPromises);
  let itemDetails: any = itemSnapshots.map((itemSnapshot) => ({
    item_id: itemSnapshot.id,
    ...itemSnapshot.data(),
  }));

  itemDetails = itemDetails.map((data: any) => {
    const itemBasket = basket.find((e) => e.item_id === data.item_id);
    if (itemBasket) {
      return {
        ...data,
        id: itemBasket.id,
        taken_amount: itemBasket.taken_amount,
      };
    }
    console.log(itemBasket);
  });

  return itemDetails;
};
