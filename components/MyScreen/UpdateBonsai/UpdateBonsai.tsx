//restyle/shopyfi theme
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../theme/theme";
//react
import * as React from "react";
import { FC, useState } from "react";
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
import { UpdateBonsaiProps } from "../../../types/bottomSheetTypes";
import ErrorMessage from "../../Common/ErrorMessage";

const UpdateBonsai: FC<UpdateBonsaiProps> = ({ navigation, route }) => {
  const updateBonsai = route.params.bonsai;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Update "' + updateBonsai.name + '"',
    });
  }, [navigation]);

  const theme = useTheme<Theme>();
  const [errMss, setErrMss] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string>(updateBonsai.image);
  const [bonsaiName, setbonsaiName] = useState(updateBonsai.name);

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
            aspect: [16, 9],
            quality: 1,
          })
        : await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  const NavigateToNextPage = () => {
    if (bonsaiName) {
      setErrMss(null);
      navigation.navigate("UpdateBonsaiStep2", {
        bonsai: updateBonsai,
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
        <ErrorMessage
          visible={modalVisible}
          setModalVisible={setModalVisible}
          title={"Etwas ist Schiefgelaufen!"}
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
              color={errMss ? theme.colors.error : null}
              inputMessage={errMss ? "Spitzname hinzufügen" : ""}
            />
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default UpdateBonsai;
