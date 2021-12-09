export type WorkElementProps = {
  item: string;
  selectedWork: any;
  setSelectedWorks: (props: any) => void;
};

export type ModalButtonsProps = {
  onSend: () => void;
  setModalVisible: (props: boolean) => void;
  visible: boolean;
};

export type AddPicAndDateProps = {
  openImagePicker: (type: any) => void;
  setmodalImagePickerVisible: (props: boolean) => void;
  modalImagePickerVisible: boolean;
  image: string | undefined;
  showDatepicker: () => void;
  date: boolean;
  taskDate: Date;
  show: boolean;
  mode: string;
  onChange: (event: any, selectedDate: any) => void;
};

export type AddWorksModalProps = {
  setModalVisible: (props: boolean) => void;
  setAddWorksVisible: (props: boolean) => void;
  visible: boolean;
  data: any;
  title: string;
  addWorksVisible: boolean;
};

export type WorkItemProps = {
  task: {
    taskID: string;
    doneTask: string[];
    taskDate: Date;
    taskImage: string;
    taskNote: string;
  };
  bonsai: any;
};

export type WorksViewProps = {
  user: any;
  bonsaiData: any;
};
