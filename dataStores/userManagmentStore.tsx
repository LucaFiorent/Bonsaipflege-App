import create from "zustand";
import firebase from "firebase";

interface authData {
  user: firebase.User | null;
}

export const authStore = create<authData>(() => ({
  user: null,
  nickname: null,
}));
