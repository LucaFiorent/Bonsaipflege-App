//react
import * as React from "react";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Image, Platform, Pressable, ScrollView } from "react-native";
//expo
import Constants from "expo-constants";

//restyle/shopyfi theme
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../theme/theme";
//components
import NextStepButton from "../../Common/NextStepButton";
//common components
import Box from "../../Common/Box";
import Text from "../../Common/Text";
//data

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BottomSheetModalContainer from "./BottomSheetModalContainer";
import { FormsData, SizesData } from "../../../types/firebaseTypes";

import db from "../../../firebase/firebaseConfig";
import Input from "../../Common/Input";
import ToggleSwitchButton from "../../Common/ToggleSwitchButton";
import { UpdateBonsaiStep2Props } from "../../../types/bottomSheetTypes";
import { userStore } from "../../../dataStores/accountStore";

import DateTimePicker from "@react-native-community/datetimepicker";
import { SimpleLineIcons } from "@expo/vector-icons";
import moment from "moment";
import firebase from "firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const AddBonsaiStep2: FC<UpdateBonsaiStep2Props> = ({ route, navigation }) => {
  const updateBonsai = route.params.bonsai;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Update "' + updateBonsai.name + '"',
    });
  }, [navigation]);

  const theme = useTheme<Theme>();
  const userData = userStore();

  // const formData = forms;

  const [modalOptions, setModalOptions] = useState<string[]>([]);
  const [currentlyEditing, setCurrentlyEditing] = useState<string>();

  //previus values
  const image = route.params.image;
  const bonsaiName = route.params.bonsaiName;
  //get all Forms from Firestore Database
  useEffect(() => {
    const entityRefForms = db.collection("forms");
    const entityRefSizes = db.collection("sizes");

    entityRefForms.onSnapshot(
      (querySnapshot: any) => {
        const newEntities: any = [];
        querySnapshot.forEach((doc: any) => {
          const entity = doc.data();
          entity.id = doc.id;
          newEntities.push(entity);
        });
        setFormsFirestore(newEntities);
      },
      (error: any) => {
        console.log(error, "no forms found");
      }
    );
    entityRefSizes.onSnapshot(
      (querySnapshot: any) => {
        const newEntities: any = [];
        querySnapshot.forEach((doc: any) => {
          const entity = doc.data();
          entity.id = doc.id;
          newEntities.push(entity);
        });
        setSizesFirestore(newEntities);
      },
      (error: any) => {
        console.log(error, "no sizes found");
      }
    );
  }, []);
  //set forms and sizes gotten from Database
  const [formsFirestore, setFormsFirestore] = useState<FormsData[]>([]);
  const [sizesFirestore, setSizesFirestore] = useState<SizesData[]>([]);

  //set other values
  const [treeType, setTreeType] = useState(updateBonsai.type);
  const [publicBonsai, setPublic] = useState(updateBonsai.publicBonsai);

  //map only forms and sizes in Japain
  const formJP = formsFirestore.map((item) => item.formJP);
  const sizeJP = sizesFirestore.map((item) => item.sizeJP);

  //set values for calendar
  const [acquisitionDate, setAcquisitionDate] = useState(
    updateBonsai.acquisitionDate
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(false);

  // Logic for calendar
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || acquisitionDate;
    setShow(Platform.OS === "ios");
    setAcquisitionDate(currentDate);
    setDate(true);
  };
  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };

  //set bottom sheet modal values
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%", "50%"], []);
  const statusBarHeight = Constants.statusBarHeight;
  //bottom sheet modal logic
  const handlePresentModalPress = (values: string[], editingInput: string) => {
    setModalOptions(values);
    setCurrentlyEditing(editingInput);
    bottomSheetModalRef.current?.present();
  };
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  //set selected forms or sizes
  const [selectedForm, setForm] = useState(updateBonsai.form);
  const [selectedSize, setSize] = useState(updateBonsai.size);
  // set form or size logic
  const setOption = (selectedOption: string) => {
    if (currentlyEditing === "Formen") {
      setForm(selectedOption);
    }
    if (currentlyEditing === "Größen") {
      setSize(selectedOption);
    }
    bottomSheetModalRef.current?.dismiss();
  };
  const selectedValue =
    currentlyEditing === "Größen" ? selectedSize : selectedForm;

  // bundle bonsai data
  const bonsai = {
    image: "",
    name: bonsaiName,
    form: selectedForm,
    size: selectedSize,
    type: treeType,
    acquisitionDate: acquisitionDate,
    publicBonsai: publicBonsai,
    userId: userData.id,
  };
  // OnPress Event that aktivate the function that send the Data and redirect
  const addNewBonsai = async () => {
    let imageResult = await image;

    if (imageResult) {
      addPicture(image, bonsai.name, updateBonsai.image)
        .then(() => {
          Alert.alert("Success");
          navigation.navigate("MyScreen");
        })
        .catch((err) => {
          Alert.alert(err);
        });
    }
  };

  // function that send the Bonsai Data to the Firebase database
  const addPicture = async (
    imagePath: string,
    imageName: string,
    oldImage: string
  ) => {
    var fileRef = firebase.storage().refFromURL(oldImage);

    var delPic = fileRef.delete();
    console.log(delPic);

    const response = await fetch(imagePath);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("bonsaiImages/" + imageName + "-" + uuidv4());
    const snapshot = await ref.put(blob);
    const imageUrl = await snapshot.ref.getDownloadURL();

    db.collection("bonsais")
      .doc(updateBonsai.id)
      .set({ ...bonsai, image: imageUrl });
  };

  moment.locale("de");

  //return component
  return (
    <>
      <NextStepButton
        onPress={addNewBonsai}
        primary={theme.colors.primarySalmonColor}
        title="Bonsai Speichern"
        icon="arrow-right-circle"
        index={0}
      />
      <Box marginHorizontal="m" zIndex={-1}>
        <SafeAreaView>
          <ScrollView>
            <Box
              flexDirection="row"
              marginTop="m"
              marginBottom="xl"
              alignItems="center"
            >
              <Image
                source={
                  image
                    ? { uri: image }
                    : require("../../../assets/images/bonsai.jpg")
                }
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <Text marginLeft="m" variant="title" color="headline">
                {bonsaiName}
              </Text>
            </Box>
            <Box>
              <Text variant="inputTitle" color="headline">
                Formen
              </Text>
            </Box>
            <Pressable
              onPress={() => handlePresentModalPress(formJP, "Formen")}
            >
              <Box marginBottom="m" paddingVertical="m">
                <Box
                  borderBottomWidth={1}
                  paddingBottom="m"
                  borderColor="borderInput"
                >
                  <Text
                    color={selectedForm === "" ? "placeholderColor" : "text"}
                  >
                    {selectedForm === ""
                      ? "Wähle dir Form deines Bonsai.."
                      : selectedForm}
                  </Text>
                </Box>
              </Box>
            </Pressable>

            <Box>
              <Text variant="inputTitle" color="headline">
                Größen
              </Text>
            </Box>
            <Pressable
              onPress={() => handlePresentModalPress(sizeJP, "Größen")}
            >
              <Box marginBottom="m" paddingVertical="m">
                <Box
                  borderBottomWidth={1}
                  paddingBottom="m"
                  borderColor="borderInput"
                >
                  <Text
                    color={selectedForm === "" ? "placeholderColor" : "text"}
                  >
                    {selectedSize === ""
                      ? "Wähle dir Größe deines Bonsai.."
                      : selectedSize}
                  </Text>
                </Box>
              </Box>
            </Pressable>
            <Box>
              <Input
                label="Baum Art"
                placeholder="Wähle die Art deines Bonsai.."
                value={treeType}
                onChange={(treeType) => setTreeType(treeType)}
              />
            </Box>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={acquisitionDate}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <Pressable onPress={showDatepicker}>
              <Box>
                <Text
                  variant="inputTitle"
                  marginBottom="xs"
                  style={{ color: theme.colors.headline }}
                >
                  Erwerbsdatum
                </Text>
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  marginRight="xxl"
                >
                  <Box flex={1} borderBottomWidth={1} borderColor="borderInput">
                    <Text
                      style={{
                        fontSize: 16,
                        color: theme.colors.text,
                        paddingHorizontal: theme.spacing.xs,
                        paddingBottom: theme.spacing.xs,
                        paddingTop: theme.spacing.xs,
                      }}
                    >
                      {moment(acquisitionDate).format("D MMMM YYYY")}
                    </Text>
                  </Box>
                </Box>
                <Box
                  padding="m"
                  backgroundColor={
                    date ? "primaryGreenColor" : "primarySalmonColor"
                  }
                  borderRadius="l"
                  position="absolute"
                  right={0}
                >
                  {date && (
                    <Box
                      position="absolute"
                      flex={1}
                      alignItems="center"
                      justifyContent="center"
                      right={11}
                      bottom={11}
                      backgroundColor="textOnDark"
                      borderRadius="xl"
                      zIndex={1}
                      style={{ padding: 2 }}
                    >
                      <SimpleLineIcons
                        size={11}
                        name="check"
                        color={theme.colors.primaryGreenColor}
                      />
                    </Box>
                  )}

                  <SimpleLineIcons
                    size={24}
                    name="calendar"
                    color={theme.colors.textOnDark}
                  />
                </Box>
              </Box>
            </Pressable>
            <ToggleSwitchButton
              publicBonsai={publicBonsai}
              setPublic={setPublic}
              title={
                !publicBonsai
                  ? "Bonsai ist privat"
                  : "Bonsai wird veröffentlichen"
              }
            />
          </ScrollView>
        </SafeAreaView>
      </Box>

      <BottomSheetModalProvider>
        <BottomSheetModal
          topInset={Platform.OS === "ios" ? statusBarHeight : 0}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleComponent={() => (
            <Box alignItems="center" padding="s">
              <Box
                width={42}
                height={4}
                backgroundColor="primarySalmonColor"
                borderRadius="m"
              />
            </Box>
          )}
        >
          <Box marginHorizontal="xl" marginTop="m">
            <Box marginBottom="m">
              <Text variant="title" color="headline" textTransform="uppercase">
                {currentlyEditing}
              </Text>
            </Box>
          </Box>
          {modalOptions ? (
            <BottomSheetModalContainer
              values={modalOptions}
              onPress={setOption}
              selectedValue={selectedValue}
              currentlyEditing={currentlyEditing}
              data={
                currentlyEditing === "Größen" ? sizesFirestore : formsFirestore
              }
            />
          ) : null}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};
export default AddBonsaiStep2;