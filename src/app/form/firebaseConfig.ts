import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwP5OKAbAcyjLvFcLV44Nif2ZVPmc9eUU",
  authDomain: "garuda-hacks-27649.firebaseapp.com",
  projectId: "garuda-hacks-27649",
  storageBucket: "garuda-hacks-27649.appspot.com",
  messagingSenderId: "699660083630",
  appId: "1:699660083630:web:8fc326ea703bac9de3e83f",
  measurementId: "G-27KEVG44Z9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();

export { db, storage, auth };
