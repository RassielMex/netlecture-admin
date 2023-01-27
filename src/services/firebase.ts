// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA3r1H1OIgguVGNI3WQXOW_hYaUaK6Vjc",
  authDomain: "js-netlecture.firebaseapp.com",
  databaseURL: "https://js-netlecture-default-rtdb.firebaseio.com",
  projectId: "js-netlecture",
  storageBucket: "js-netlecture.appspot.com",
  messagingSenderId: "85035158086",
  appId: "1:85035158086:web:415a18ed8872bcf63c9847",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
