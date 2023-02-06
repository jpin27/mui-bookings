// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
 
//   apiKey: "AIzaSyCB0tjl_2PasKhz22vGu_3tIMGm9MUeiSc",
//   authDomain: "mui-bookings-6bc0c.firebaseapp.com",
//   projectId: "mui-bookings-6bc0c",
//   storageBucket: "mui-bookings-6bc0c.appspot.com",
//   messagingSenderId: "1014625239858",
//   appId: "1:1014625239858:web:08d819388f27190d5ecd2b",
//   measurementId: "G-CK091GB2ST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);