import create from "zustand";
import firebase from "firebase";

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
