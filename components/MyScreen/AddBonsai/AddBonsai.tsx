//restyle/shopyfi theme
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../theme/theme";
//react
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//common components
import Box from "../../Common/Box";
import ButtonWithIcon from "../../Common/ButtonWithIcon";
import Input from "../../Common/Input";
import NextStepButton from "../../Common/NextStepButton";
//expo
import * as ImagePicker from "expo-image-picker";
//stores
import { AddBonsaiProps } from "../../../types/bottomSheetTypes";
import ErrorMessage from "../../Common/ErrorMessage";
import Modal from "../../Common/Modal";

const AddBonsai: FC<AddBonsaiProps> = ({ navigation }) => {
  const theme = useTheme<Theme>();
  const [errMss, setErrMss] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string>(
    "https://firebasestorage.googleapis.com/v0/b/bonsaipflege-app.appspot.com/o/bonsai-pic.jpg?alt=media&token=a04f373c-7501-4d78-ad0c-159597daa4e3"
  );
  const [bonsaiName, setbonsaiName] = useState("");

  const openImagePicker = async (type: any) => {
    const { status } =
      type === "camera"
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      if (type === "camera") alert("Sorry, we need camera");
      if (type === "library")
        alert("Media Library roll permissions to make this work!");
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

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  const NavigateToNextPage = () => {
    if (bonsaiName) {
      setErrMss(null);
      navigation.navigate("AddBonsaiStep2", {
        image: image,
        bonsaiName: bonsaiName,
      });
    } else {
      setModalVisible(!modalVisible);
      setErrMss("Füge ein Namen für dein Bonsai hinzu um weiter zu gehen!");
    }
  };

  return (
    <>
      <NextStepButton
        onPress={NavigateToNextPage}
        primary={theme.colors.primarySalmonColor}
        title="nächster Schritt"
        icon="arrow-right-circle"
      />
      {errMss && (
        <Modal
          setModalVisible={setModalVisible}
          visible={modalVisible}
          title="Etwas ist Schiefgelaufen!"
          type="error"
          message={errMss}
          primary={theme.colors.error}
        />
      )}
      <SafeAreaView>
        <ScrollView>
          <Box marginHorizontal="m">
            <Box marginHorizontal="xxl" marginTop="xl">
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: 250, borderRadius: 20 }}
              />
            </Box>
            <Box flexDirection="row" justifyContent="center">
              <ButtonWithIcon
                onPress={() => openImagePicker("camera")}
                title="Kamera"
                primary={theme.colors.primarySalmonColor}
                icon="camera"
              />
              <ButtonWithIcon
                onPress={() => openImagePicker("library")}
                title="Durchsuchen"
                primary={theme.colors.primarySalmonColor}
                icon="folder-alt"
              />
            </Box>
            <Input
              label="Spitzname"
              placeholder="Füge ein Spitznamen für dein Bonsai hinzu"
              value={bonsaiName}
              onChange={(bonsaiName) => setbonsaiName(bonsaiName)}
              color={errMss ? theme.colors.error : ""}
              type={errMss ? "error" : "success"}
              inputMessage={errMss ? "Spitzname hinzufügen" : ""}
            />
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default AddBonsai;
