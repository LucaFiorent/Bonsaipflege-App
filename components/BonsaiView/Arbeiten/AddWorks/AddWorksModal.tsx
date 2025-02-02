import React, { FC, useState } from "react";
import Box from "../../../Common/Box";
import Text from "../../../Common/Text";
import { Platform, Alert } from "react-native";
import theme from "../../../../theme/theme";
import Modal from "react-native-modal";
import { Additem } from "iconsax-react-native";

//expo
import * as ImagePicker from "expo-image-picker";
import ImagePickerModal from "../../../Common/ImagePickerModal";
import { works } from "../../../../data/bonsaiData";
import Input from "../../../Common/Input";
import AddPicAndDate from "./AddWorksModalComponents/AddPicAndDate";
import WorkElement from "./AddWorksModalComponents/WorkElement";
import ModalButtons from "./AddWorksModalComponents/ModalButtons";
import { db, storage } from "../../../../firebase/firebaseConfig";
import firebase from "firebase";

import { v4 as uuidv4 } from "uuid";
import { userBonsaisStore } from "../../../../dataStores/accountStore";
import { AddWorksModalProps } from "../../../../types/WorkViewTypes";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AddWorksModal: FC<AddWorksModalProps> = ({
  setModalVisible,
  visible,
  data,
  title,
  setAddWorksVisible,
  addWorksVisible,
}) => {
  const { myBonsais } = userBonsaisStore();

  const [modalImagePickerVisible, setmodalImagePickerVisible] = useState(false);
  // calender logic
  const [taskDate, settaskDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || taskDate;
    setShow(Platform.OS === "ios");
    settaskDate(currentDate);
    setDate(true);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // image picker logic
  const [image, setImage] = useState<string>();

  const openImagePicker = async (type: any) => {
    const { status } =
      type === "camera"
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert(
        "Sorry, we need " + (type === "camera")
          ? "camera"
          : "Media Library" + " roll permissions to make this work!"
      );
    }

    let pickerResult =
      type === "camera"
        ? await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
          })
        : await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
          });
    setmodalImagePickerVisible(!modalImagePickerVisible);

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
      setmodalImagePickerVisible(!modalImagePickerVisible);
    }
  };

  // select Work and add Work Note logic
  const [selectedWork, setSelectedWorks] = useState<string[]>([]);
  const [taskNote, settaskNote] = useState<string>("");

  const setSelectedWorkLogic = (newTask: string) => {
    if (!selectedWork.includes(newTask)) {
      setSelectedWorks([...selectedWork, newTask]);
    } else {
      const selWorkList = selectedWork.filter((selTask) => selTask != newTask);
      setSelectedWorks(selWorkList);
    }
  };

  const task = {
    taskID: uuidv4(),
    taskImage: "",
    taskDate: taskDate,
    doneTask: selectedWork,
    taskNote: taskNote,
  };

  const sendTasks = () => {
    let imageResult = image;
    if (imageResult) {
      addData(image)
        .then(() => {
          setSelectedWorks([]);
          settaskNote("");
          setImage("");
          settaskDate(new Date());
          setModalVisible(!visible);
          setAddWorksVisible(!visible);
        })
        .catch((err) => {
          Alert.alert(err);
        });
    }
  };

  const addData = async (imagePath: any) => {
    let imageUrl = "";

    if (image) {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const storageRef = ref(storage, `bonsaiTaskImages/${uuidv4()}`);
      await uploadBytes(storageRef, blob);
      imageUrl = await getDownloadURL(storageRef);
    }

    const updatedBonsai = myBonsais.map((item) => {
      if (item.id === data.id) {
        let bonsaiTasks = item.tasks || [];
        bonsaiTasks.push({ ...task, taskImage: imageUrl });
        return { ...item, tasks: bonsaiTasks, updatedOn: new Date() };
      }
      return item;
    });

    userBonsaisStore.setState({ myBonsais: updatedBonsai });

    await setDoc(doc(db, "bonsais", data.id), {
      tasks: updatedBonsai.find((item) => item.id === data.id)?.tasks,
      updatedOn: new Date(),
    });
  };

  return (
    <Modal backdropOpacity={0.5} isVisible={visible}>
      <Box
        backgroundColor="mainBackground"
        borderColor="primarySalmonColor"
        borderTopWidth={wp(3.5)}
        borderRadius="m"
        paddingHorizontal="l"
      >
        <Box
          justifyContent="center"
          alignItems="center"
          paddingTop="xl"
          marginBottom="m"
        >
          <Box alignItems="center">
            <Box
              alignItems="center"
              justifyContent="center"
              backgroundColor="primarySalmonColor"
              width={wp(21)}
              height={wp(21)}
              borderRadius="xl"
              position="absolute"
              marginBottom="l"
              top={hp(-10)}
            >
              <Additem
                size={wp(10)}
                color={theme.colors.textOnDark}
                variant="Broken"
              />
            </Box>
            <Box marginTop="l">
              <Text
                variant="h1"
                fontWeight="bold"
                style={{ color: theme.colors.text }}
              >
                {title}
              </Text>
            </Box>
          </Box>
        </Box>
        <AddPicAndDate
          openImagePicker={openImagePicker}
          setmodalImagePickerVisible={setmodalImagePickerVisible}
          modalImagePickerVisible={modalImagePickerVisible}
          image={image}
          showDatepicker={showDatepicker}
          date={date}
          taskDate={taskDate}
          show={show}
          mode={mode}
          onChange={onChange}
        />
        <Box>
          <Box marginBottom="m">
            <Text variant="inputTitle" color="headline">
              Arbeiten
            </Text>
          </Box>
          <Box
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            marginBottom="m"
          >
            {works.map((item) => (
              <WorkElement
                key={works.indexOf(item)}
                item={item}
                selectedWork={selectedWork}
                setSelectedWorks={setSelectedWorkLogic}
              />
            ))}
          </Box>
        </Box>
        <Input
          label="Hinweis"
          placeholder="Füge ein Hinweis zur durchgeführten Arbeit hinzu"
          value={taskNote}
          onChange={(taskNote) => settaskNote(taskNote)}
        />
        <ModalButtons
          onSend={sendTasks}
          setModalVisible={setModalVisible}
          visible={visible}
        />
      </Box>

      <ImagePickerModal
        setModalVisible={setmodalImagePickerVisible}
        onPressHandler={openImagePicker}
        visible={modalImagePickerVisible}
      />
    </Modal>
  );
};

export default AddWorksModal;
