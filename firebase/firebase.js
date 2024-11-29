import "firebase/auth"; // for authentication
import "firebase/firestore"; // for Firestore
import { Alert } from "react-native";
import { auth, db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Registration Function
export async function registration(email, password, nickname) {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const currentUser = userCredential.user;

    // Store user data in Firestore
    await setDoc(doc(db, "users", currentUser.uid), {
      email: currentUser.email,
      nickname: nickname,
    });

    await setDoc(doc(db, "userData", currentUser.uid), {
      id: currentUser.uid,
      nickname: nickname,
      avatar: "",
      subscribed: [],
      subscribers: [],
    });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
    return false;
  }
}

// Login Function
export async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log("something went wrong");
    Alert.alert("There is something wrong!", err.message);
  }
}

// Logout Function
export async function loggingOut() {
  try {
    await signOut(auth);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
