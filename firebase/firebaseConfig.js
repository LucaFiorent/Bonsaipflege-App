// import * as firebase from "firebase";
// import "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDDvdfnTHT9G6ASYdvnMZQMDzPRaM5t5WY",
  authDomain: "bonsaipflege-app.firebaseapp.com",
  projectId: "bonsaipflege-app",
  storageBucket: "bonsaipflege-app.appspot.com",
  messagingSenderId: "57043505576",
  appId: "1:57043505576:web:8f062b70326a2e03580d9d",
  measurementId: "G-SJR0JHDSTJ",
};

// Initialize Firebase app
let app;
let db;
let auth;
let storage;

try {
  // Initialize Firebase App
  app = initializeApp(firebaseConfig);
  // console.log("Firebase app initialized:", app);

  // Initialize Firestore (Database)
  db = getFirestore(app);
  // console.log("Firestore (db) initialized:", db);

  // Initialize Firebase Auth with AsyncStorage Persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  // console.log("Firebase Auth initialized:", auth);

  // Initialize Firebase Storage
  storage = getStorage(app);
  // console.log("Firebase Storage initialized:", storage);
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

// Export the initialized services for use in your app
export { db, auth, storage };
