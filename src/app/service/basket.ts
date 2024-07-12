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

export const addItemToBasket = async (
  user_id?: string,
  item_id?: string,
  quantity?: number
) => {
  const basketQuery = query(
    collection(db, "user_basket"),
    where("user_id", "==", user_id),
    where("item_id", "==", item_id)
  );

  const basketSnapshot = await getDocs(basketQuery);
  let basket: any = basketSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (basketSnapshot.docs.length == 0) {
    await addDoc(collection(db, "user_basket"), {
      user_id: user_id,
      item_id: item_id,
      taken_amount: quantity || 1,
    });
  } else {
    const basketDoc = doc(db, "user_basket", basket[0].id);
    await updateDoc(basketDoc, {
      taken_amount: basket[0].taken_amount + quantity,
    });
  }
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

export const deleteBasket = async (user_id: string) => {
  console.log("masuk ke delete >>>>>>>>>");
  const queryDoc = query(
    collection(db, "user_basket"),
    where("user_id", "==", user_id)
  );

  console.log("user id >>>>>>>>>>>>>>>>>>>>>>>>", user_id);

  const snapShot = await getDocs(queryDoc);

  console.log(snapShot);

  const basket_id = snapShot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("baseket yg dihapus >>>>>>>>>>>>>>", basket_id);

  basket_id.map(async (data) => {
    const docRef = doc(db, "user_basket", data.id);
    await deleteDoc(docRef);
  });
};
