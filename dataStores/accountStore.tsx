import create from "zustand";
import firebase from "firebase";

type Bonsai = {
  acquisitionDate: string;
  form: string;
  image: string;
  name: string;
  size: string;
  type: string;
  publicBonsai: boolean;
  userId: string;
};

export interface userBonsais {
  myBonsais: Bonsai[];
  // acquisitionDate: string;
  // form: string;
  // image: string;
  // name: string;
  // size: string;
  // type: string;
  // publicBonsai: boolean;
  // userId: string;
}

export const userBonsaisStore = create<userBonsais>((set) => ({
  myBonsais: [],
  // acquisitionDate: "",
  // form: "",
  // image: "",
  // name: "",
  // size: "",
  // type: "",
  // publicBonsai: false,
  // userId: "",
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
