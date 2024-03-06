import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoujAC2aTL0MUuzMXV0Gx-lERYAUFFOko",
  authDomain: "webproject-58141.firebaseapp.com",
  projectId: "webproject-58141",
  storageBucket: "webproject-58141.appspot.com",
  messagingSenderId: "275846045858",
  appId: "1:275846045858:web:3a146d9d6cb093b431f7fb",
  measurementId: "G-L6NQ0L94R5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, app, storage };
