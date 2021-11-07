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
import { userStore } from "../../../dataStores/accountStore";
import { setSize } from "../../../firebase/sendToFirebase";
import { AddBonsaiProps } from "../../../types/bottomSheetTypes";

const AddBonsai: FC<AddBonsaiProps> = ({ navigation }) => {
  const bonsaiPic = require("../../../assets/images/bonsai.jpg");
  const theme = useTheme<Theme>();
  const userData = userStore();
  const [image, setImage] = useState<null | string>();
  const [bonsaiName, setbonsaiName] = useState("");

  const openImagePicker = async () => {
    async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };

    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  return (
    <>
      <NextStepButton
        onPress={() =>
          navigation.navigate("AddBonsaiStep2", {
            image: image,
            bonsaiName: bonsaiName,
          })
        }
        primary={theme.colors.primarySalmonColor}
        title="nächster Schritt"
        icon="arrow-right-circle"
      />
      <SafeAreaView>
        <ScrollView>
          <Box marginHorizontal="m">
            <Box marginHorizontal="xxl" marginTop="xl">
              <Image
                source={
                  image
                    ? { uri: image }
                    : require("../../../assets/images/bonsai.jpg")
                }
                style={{ width: "100%", height: 250, borderRadius: 20 }}
              />
            </Box>
            <ButtonWithIcon
              onPress={openImagePicker}
              title="Bild hinzufügen"
              primary={theme.colors.primarySalmonColor}
            />
            <Input
              label="Spitzname"
              placeholder="Füge ein Spitznamen für dein Bonsai hinzu"
              value={bonsaiName}
              onChange={(bonsaiName) => setbonsaiName(bonsaiName)}
            />
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default AddBonsai;
