// imports
import * as React from "react";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../theme/theme";
import NextStepButton from "../../Common/NextStepButton";
import Modal from "react-native-modal";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BottomSheetModalContainer from "./BottomSheetModalContainer";
import db from "../../../firebase/firebaseConfig";
import ToggleSwitchButton from "../../Common/ToggleSwitchButton";
import { AddBonsaiStep2Props } from "../../../types/bottomSheetTypes";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import firebase from "firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { CalendarAdd, CalendarTick, ClipboardTick } from "iconsax-react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
//common components
import Box from "../../Common/Box";
import Text from "../../Common/Text";
import Input from "../../Common/Input";
//data
import { userStore } from "../../../dataStores/accountStore";
//types
import { FormsData, SizesData } from "../../../types/firebaseTypes";

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
  const [publicBonsai, setPublic] = useState(false);

  //map only forms and sizes in Japain
  const formJP = formsFirestore.map((item) => item.formJP);
  const sizeJP = sizesFirestore.map((item) => item.sizeJP);

  const [acquisitionDate, setAcquisitionDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingReady, setLoadingReady] = useState(false);

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
        console.log(error, "Keine Formen gefunden");
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
        console.log(error, "Keine Größen gefunden");
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

  // prepare bonsai data
  const bonsai = {
    image: "",
    name: bonsaiName,
    form: selectedForm,
    size: selectedSize,
    type: treeType,
    acquisitionDate: acquisitionDate,
    publicBonsai: publicBonsai,
    userId: userData.id,
    tasks: [],
    createdOn: "",
    updatedOn: "",
  };

  // OnPress Event that aktivate the function that send the Data and redirect
  const addNewBonsai = () => {
    let imageResult = image;
    if (imageResult) {
      addPicture(image, bonsai.name)
        .then(() => {
          setTimeout(() => {
            setLoading(false);
            navigation.navigate("MyScreen");
          }, 1000);
        })
        .catch((err) => {
          Alert.alert(err);
        });
    }
  };

  // function that send the Bonsai Data to the Firebase database
  const addPicture = async (imagePath: any, imageName: any) => {
    setLoading(true);
    const response = await fetch(imagePath);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("bonsaiImages/" + imageName + "-" + uuidv4());
    const snapshot = await ref.put(blob);
    const imageUrl = await snapshot.ref.getDownloadURL();
    db.collection("bonsais")
      .doc()
      .set({
        ...bonsai,
        image: imageUrl,
        createdOn: firebase.firestore.FieldValue.serverTimestamp(),
        updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setLoadingReady(true);
  };

  moment.locale("de");

  return (
    <>
      <NextStepButton
        onPress={addNewBonsai}
        primary="primarySalmonColor"
        title="Bonsai speichern"
        icon={
          <ClipboardTick
            size={wp(6.5)}
            color={theme.colors.textOnDark}
            variant="Broken"
          />
        }
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
                style={{ width: wp(22), height: wp(22), borderRadius: 50 }}
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
                      ? "Wähle die Form deines Bonsais.."
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
                    color={selectedSize === "" ? "placeholderColor" : "text"}
                  >
                    {selectedSize === ""
                      ? "Wähle die Größe deines Bonsais.."
                      : selectedSize}
                  </Text>
                </Box>
              </Box>
            </Pressable>
            <Box>
              <Input
                label="Baumart"
                placeholder="Wähle die Art deines Bonsais.."
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
                  Alter
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
                        fontSize: wp(3.5),
                        color: !date
                          ? theme.colors.placeholderColor
                          : theme.colors.text,
                        paddingHorizontal: theme.spacing.xs,
                        paddingBottom: theme.spacing.xs,
                        paddingTop: theme.spacing.xs,
                      }}
                    >
                      {date
                        ? moment(acquisitionDate).format("D MMMM YYYY")
                        : "Datum auswählen..."}
                    </Text>
                  </Box>
                </Box>
                <Box
                  width={wp(12)}
                  height={wp(12)}
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor={
                    date ? "primaryGreenColor" : "primarySalmonColor"
                  }
                  borderRadius="l"
                  position="absolute"
                  right={0}
                >
                  {date ? (
                    <CalendarTick
                      size={wp(6.5)}
                      color={theme.colors.textOnDark}
                      variant="Broken"
                    />
                  ) : (
                    <CalendarAdd
                      size={wp(6.5)}
                      color={theme.colors.textOnDark}
                      variant="Broken"
                    />
                  )}
                </Box>
              </Box>
            </Pressable>
            <ToggleSwitchButton
              publicBonsai={publicBonsai}
              setPublic={setPublic}
              title={"Bonsai veröffentlichen"}
            />
          </ScrollView>
        </SafeAreaView>
      </Box>
      <Modal
        backdropOpacity={0.5}
        isVisible={loading}
        backdropColor={theme.colors.textOnDark}
      >
        {!loadingReady ? (
          <ActivityIndicator
            size={wp(15)}
            color={theme.colors.primarySalmonColor}
          />
        ) : (
          <Box alignItems="center" justifyContent="center">
            <Box
              alignItems="center"
              backgroundColor="mainBackground"
              justifyContent="center"
              width={wp(25)}
              height={wp(25)}
              borderRadius="xxl"
            >
              <ClipboardTick
                size={wp(14)}
                color={theme.colors.primarySalmonColor}
              />
            </Box>
          </Box>
        )}
      </Modal>

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
                width={wp(14)}
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
