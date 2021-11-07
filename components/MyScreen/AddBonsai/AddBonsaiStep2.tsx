//react
import * as React from "react";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Platform, Pressable, ScrollView } from "react-native";
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
import { AddBonsaiStep2Props } from "../../../types/bottomSheetTypes";
import { userStore } from "../../../dataStores/accountStore";
import { addBonsai } from "../../../firebase/sendToFirebase";
import { setStatusBarBackgroundColor } from "expo-status-bar";

const AddBonsaiStep2: FC<AddBonsaiStep2Props> = ({ route, navigation }) => {
  const theme = useTheme<Theme>();
  const userData = userStore();

  // const formData = forms;

  const [modalOptions, setModalOptions] = useState<string[]>([]);
  const [currentlyEditing, setCurrentlyEditing] = useState<string>();

  //previus values
  const image = route.params.image;
  const bonsaiName = route.params.bonsaiName;

  //set forms and sizes gotten from Database
  const [formsFirestore, setFormsFirestore] = useState<FormsData[]>([]);
  const [sizesFirestore, setSizesFirestore] = useState<SizesData[]>([]);
  //set other values
  const [treeType, setTreeType] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState("");
  const [publicBonsai, setPublic] = useState(false);

  //map only forms and sizes in Japain
  const formJP = formsFirestore.map((item) => item.formJP);
  const sizeJP = sizesFirestore.map((item) => item.sizeJP);

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

  //modal logic
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["30%", "50%"], []);
  const statusBarHeight = Constants.statusBarHeight;

  const handlePresentModalPress = (values: string[], editingInput: string) => {
    setModalOptions(values);
    setCurrentlyEditing(editingInput);
    bottomSheetModalRef.current?.present();
  };
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  //set selected forms or sizes
  const [selectedForm, setForm] = useState("");
  const [selectedSize, setSize] = useState("");

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

  const bonsai = {
    image: image,
    name: bonsaiName,
    form: selectedForm,
    size: selectedSize,
    type: treeType,
    acquisitionDate: acquisitionDate,
    publicBonsai: publicBonsai,
    userId: userData.id,
  };
  // console.log(bonsai);

  // var user = db.collection("userData").doc(userData.id);
  // console.log(user);

  const addNewBonsai = async () => {
    if (bonsai) {
      db.collection("bonsais")
        .doc()
        .set({ ...bonsai });

      navigation.navigate("MyScreen");
    }
  };

  //return component
  return (
    <>
      <NextStepButton
        onPress={addNewBonsai}
        primary={theme.colors.primarySalmonColor}
        title="nächster Schritt"
        icon="arrow-right-circle"
      />
      <Box marginHorizontal="m">
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
            <Box>
              <Input
                label="Erwerbsdatum"
                placeholder="TT/MM/JJJJ"
                value={acquisitionDate}
                onChange={(acquisitionDate) =>
                  setAcquisitionDate(acquisitionDate)
                }
              />
            </Box>
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
