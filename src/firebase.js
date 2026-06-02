// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFj1lU13eljQHNaMF2LUUd-84Gp8dlVl0",
  authDomain: "eventhub-70ebf.firebaseapp.com",
  projectId: "eventhub-70ebf",
  storageBucket: "eventhub-70ebf.firebasestorage.app",
  messagingSenderId: "99929159399",
  appId: "1:99929159399:web:37c0a7ab4302b067411442"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)