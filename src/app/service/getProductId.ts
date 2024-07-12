// import { db } from "@/app/form/firebaseConfig";
// import { ItemData } from "@/interface/ItemData";
// import { doc, getDoc } from "firebase/firestore";

// export const getProductId = async (id: string): Promise<ItemData | null> => {
//   const docRef = doc(db, "items", id);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     return { id: docSnap.id, ...docSnap.data() } as ItemData;
//   } else {
//     return null;
//   }
// };

// file: app/service/getProductId.ts
import { db } from "@/app/form/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ItemData } from "@/interface/ItemData";

export const getProductId = async (id: string): Promise<ItemData | null> => {
  const docRef = doc(db, "items", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as ItemData;
  } else {
    return null;
  }
};
