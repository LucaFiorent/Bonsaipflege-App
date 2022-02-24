import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import db from "./firebaseConfig";

export async function registration(email, password, nickname) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      nickname: nickname,
    });
    db.collection("userData").doc(currentUser.uid).set({
      id: currentUser.uid,
      nickname: nickname,
      avatar: "",
      subscribed: [],
      subscribers: [],
    });
  } catch (err) {
    Alert.alert("Upps! Etwas ist schiefgelaufen.", err.message);
    return false;
  }
}

export async function login(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("Upps! Etwas ist schiefgelaufen.", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("Upps! Etwas ist schiefgelaufen.", err.message);
  }
}
