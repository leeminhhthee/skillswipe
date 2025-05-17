// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMK6uZEUdvVm57E2a5iDnLm1yZ7nJtkIw",
  authDomain: "skillswipe-54050.firebaseapp.com",
  projectId: "skillswipe-54050",
  storageBucket: "skillswipe-54050.firebasestorage.app",
  messagingSenderId: "580524229479",
  appId: "1:580524229479:web:85957c3d7269b6980425c2",
  measurementId: "G-0EZ3QZMXCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage )
});
const analytics = getAnalytics(app);

export {
    auth
}