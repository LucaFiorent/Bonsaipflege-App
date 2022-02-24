import create from "zustand";
import firebase from "firebase";

export const communityBonsaisStore = create<communityBonsaisData>(() => ({
  communityBonsais: [],
}));

export interface communityBonsaisData {
  communityBonsais: communityBonsais[];
}
type communityBonsais = {
  id: string;
  acquisitionDate: string;
  form: string;
  image: string;
  name: string;
  size: string;
  type: string;
  publicBonsai: boolean;
  userId: string;
  tasks: Task[];
  createdOn?: Date;
  updatedOn?: Date;
};

type Task = {
  taskID: string;
  doneTask: string[];
  taskDate: Date;
  taskImage: string;
  taskNote: string;
};

export const communityDataStore = create<communityData>(() => ({
  communityProfiles: [],
}));

export interface communityData {
  communityProfiles: communityProfiles[];
}

type communityProfiles = {
  id: string;
  nickname: string;
  avatar: string;
  bonsais: string[];
  subscribed: string[];
  subscribers: string[];
};
