// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDW3OrTBoDWyCqcoO9pW6VA22nDc_RuiWs",
  authDomain: "tools-87d47.firebaseapp.com",
  projectId: "tools-87d47",
  storageBucket: "tools-87d47.appspot.com",
  messagingSenderId: "894974256659",
  appId: "1:894974256659:web:a0094906f8dff8e05d81e6",
  measurementId: "G-L3TVZNSXKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
