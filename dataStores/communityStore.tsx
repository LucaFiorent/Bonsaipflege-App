import create from "zustand";
import firebase from "firebase";

export interface communityData {
  id: string;
  nickname: string;
  avatar: string;
  bonsais: string[];
  subscribed: string[];
  subscribers: string[];
}

export const communityStore = create<communityData>(() => ({
  id: "",
  nickname: "",
  avatar: "",
  bonsais: [],
  subscribed: [],
  subscribers: [],
}));
