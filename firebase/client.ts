import { getApp, getApps, initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJlwmdXcjoWEGxuCBzeig41UgBN7MpZ0s",
  authDomain: "jobpulseai.firebaseapp.com",
  projectId: "jobpulseai",
  storageBucket: "jobpulseai.firebasestorage.app",
  messagingSenderId: "416201876551",
  appId: "1:416201876551:web:0bc8e598adf34f4112fd62",
  measurementId: "G-0RY98N8L9Q"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);