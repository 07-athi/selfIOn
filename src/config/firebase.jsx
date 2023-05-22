// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2lZlnxWCvhfxaoE7ykmbI8xZHSXs0dP8",
  authDomain: "social-media-1c575.firebaseapp.com",
  projectId: "social-media-1c575",
  storageBucket: "social-media-1c575.appspot.com",
  messagingSenderId: "942064699209",
  appId: "1:942064699209:web:1dc412ba1e598bfec83c98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)