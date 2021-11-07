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
