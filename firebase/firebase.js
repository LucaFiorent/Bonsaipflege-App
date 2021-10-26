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
      bonsais: [],
      subscribed: [],
      subscribers: [],
    });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
    return false;
  }
}

export async function login(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.log("something went wrong");
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
