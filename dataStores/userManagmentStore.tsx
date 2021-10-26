import create from "zustand";
import firebase from "firebase";

interface authData {
  user: firebase.User | null;
}

export const authStore = create<authData>(() => ({
  user: null,
  nickname: null,
}));

export interface userData {
  id: string;
  nickname: string;
  avatar: string;
  bonsais: string[];
  subscribed: string[];
  subscribers: string[];
}

export const userStore = create<userData>(() => ({
  id: "",
  nickname: "",
  avatar: "",
  bonsais: [],
  subscribed: [],
  subscribers: [],
}));
