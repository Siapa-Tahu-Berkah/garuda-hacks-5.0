import "firebase/auth";
import { auth, db } from "@/app/form/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      console.log(user);

      if (userSnap.exists()) {
        const roleQuery = query(
          collection(db, "user_role"),
          where("user_id", "==", user.uid)
        );

        const roleSnapshot = await getDocs(roleQuery);
        let roles: any = roleSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // console.log(roles);

        const roleRef = doc(db, "roles", roles[0].role_id);
        const roleSnap = await getDoc(roleRef);
        roles = roleSnap.data();

        // console.log(roleSnap);
        // console.log(roles);

        Cookies.set("role", roles.role_level);
      } else {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          point: 0,
        });

        const roleQuery = query(
          collection(db, "roles"),
          where("role_level", "==", 1)
        );

        const roleSnapshot = await getDocs(roleQuery);
        const roles: any = roleSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // console.log(roles);

        await addDoc(collection(db, "user_role"), {
          role_id: roles[0].id,
          user_id: user.uid,
        });

        Cookies.set("role", roles[0].role_level);
      }

      Cookies.set("name", user.displayName || "", { expires: 1 });
      Cookies.set("email", user.email || "", { expires: 1 });
      Cookies.set("photo", user.photoURL || "", { expires: 1 });
      Cookies.set("id", user.uid || "", { expires: 1 });

      return 1;

      // console.log("user", user);
      // // return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...

      console.log(errorCode, errorMessage);

      return 0
    });
