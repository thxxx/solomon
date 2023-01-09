import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLtbJ1mRNPaAwLMqoiCkzhCB5_fMweY34",
  authDomain: "dice-d7a83.firebaseapp.com",
  projectId: "dice-d7a83",
  storageBucket: "dice-d7a83.appspot.com",
  messagingSenderId: "216781204675",
  appId: "1:216781204675:web:4bf58848f79470e2eac676",
  measurementId: "G-JWDQ0Q3KVE",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const authService = app.auth();
export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const stService = app.storage();
