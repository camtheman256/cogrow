import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXJ0RymG8MZCgzjDAgskdoLOAKvkWTTEU",
  authDomain: "cogrow-5b957.firebaseapp.com",
  projectId: "cogrow-5b957",
  storageBucket: "cogrow-5b957.appspot.com",
  messagingSenderId: "952173385772",
  appId: "1:952173385772:web:24e56dfbca0d3f32cad989",
  measurementId: "G-PPJMWQJ45W",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);