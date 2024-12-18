import { create } from "zustand";
type Task = {
  taskID: string;
  doneTask: string[];
  taskDate: Date;
  taskImage: string;
  taskNote: string;
};

type Bonsai = {
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
  createdOn: Date;
  updatedOn?: Date;
};

export interface userBonsais {
  myBonsais: Bonsai[];
}

export const userBonsaisStore = create<userBonsais>((set) => ({
  myBonsais: [],
}));

export interface userData {
  id: string;
  nickname: string;
  avatar: string;
  subscribed: string[];
  subscribers: string[];
}

export const userStore = create<userData>(() => ({
  id: "",
  nickname: "",
  avatar: "",
  subscribed: [],
  subscribers: [],
}));
