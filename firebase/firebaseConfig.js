import * as firebase from "firebase";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDDvdfnTHT9G6ASYdvnMZQMDzPRaM5t5WY",
  authDomain: "bonsaipflege-app.firebaseapp.com",
  projectId: "bonsaipflege-app",
  storageBucket: "bonsaipflege-app.appspot.com",
  messagingSenderId: "57043505576",
  appId: "1:57043505576:web:8f062b70326a2e03580d9d",
  measurementId: "G-SJR0JHDSTJ",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;
