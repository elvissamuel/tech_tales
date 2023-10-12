// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1eXBYKaztdO8tgvpT9HyMe5J-yCMiZIs",
  authDomain: "blogsite-7ef32.firebaseapp.com",
  projectId: "blogsite-7ef32",
  storageBucket: "blogsite-7ef32.appspot.com",
  messagingSenderId: "1076392461708",
  appId: "1:1076392461708:web:4dc43b0b3be4ae714ec2a9",
  measurementId: "G-28NYBENN22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const myStore = getFirestore(app)