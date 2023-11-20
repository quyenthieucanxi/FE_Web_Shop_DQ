// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArQAsU8teGWdGWDwcbM7j94G2qS9T7Jr0",
  authDomain: "webshopdq.firebaseapp.com",
  projectId: "webshopdq",
  storageBucket: "webshopdq.appspot.com",
  messagingSenderId: "922651386214",
  appId: "1:922651386214:web:60e80948e71cae2ca6a8a7",
  measurementId: "G-GF0GJGQK9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage();