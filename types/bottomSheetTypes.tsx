import { FormsData, SizesData } from "./firebaseTypes";

export type AddBonsaiStep2Props = {
  route: {
    params: {
      image: string;
      bonsaiName: string;
    };
  };
  navigation: any;
};

export type AddBonsaiProps = {
  navigation: any;
};

export type UpdateBonsaiStep2Props = {
  route: {
    params: {
      bonsai: {
        acquisitionDate: Date;
        form: string;
        id: string;
        image: string;
        name: string;
        publicBonsai: boolean;
        size: string;
        type: string;
        userId: string;
        tasks: Tasks[];
      };
      user: {
        avatar: string;
        bonsais: [];
        id: string;
        nickname: string;
        subscribed: [];
        subscribers: [];
      };
      image: string;
      bonsaiName: string;
    };
  };
  navigation: any;
};

type Tasks = {
  doneTask: string[];
  taskDate: Date;
  taskImage: string;
  taskNote: string;
};

export type BonsaiViewParams = {
  route: {
    params: {
      bonsai: {
        acquisitionDate: Date;
        form: string;
        id: string;
        image: string;
        name: string;
        publicBonsai: boolean;
        size: string;
        type: string;
        userId: string;
        task: Tasks[];
      };
      user: {
        avatar: string;
        bonsais: [];
        id: string;
        nickname: string;
        subscribed: [];
        subscribers: [];
      };
      pagePath?: string;
    };
  };
  navigation: any;
};

export type UpdateBonsaiProps = {
  navigation: any;
  route: any;
};

export type BottomSheetModalContainerProps = {
  values: string[];
  onPress: (item: string) => void;
  selectedValue: string | undefined;
  currentlyEditing: string | undefined;
  data: FormsData[] | SizesData[];
};
export type BottomSheetButtonProps = {
  title: string;
  onPress: (item: string) => void;
  selectedValue: string | undefined;
  currentlyEditing: string | undefined;
  data: FormsData[] | SizesData[];
};
export type ToggleSwitchButtonProps = {
  publicBonsai: boolean;
  setPublic: (value: boolean) => void;
  title: string;
};
