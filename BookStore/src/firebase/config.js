import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase configuration
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBxgw2zc4SikPoTnmrgBWshjDjqNPQumcA",
    authDomain: "advanced-book-store-4f732.firebaseapp.com",
    projectId: "advanced-book-store-4f732",
    storageBucket: "advanced-book-store-4f732.firebasestorage.app",
    messagingSenderId: "1077172588667",
    appId: "1:1077172588667:web:195d821071bde42b8f12de",
    measurementId: "G-QQM1SEPMVW"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
