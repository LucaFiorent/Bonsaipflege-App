import * as React from "react";
import { userStore } from "../../../dataStores/accountStore";
import { Alert, Image, Pressable } from "react-native";
import theme from "../../../theme/theme";
import Box from "../../Common/Box";
import Input from "../../Common/Input";
import { Camera, Edit2 } from "iconsax-react-native";
import Button from "../../Common/Button";
import ImagePickerModal from "../../Common/ImagePickerModal";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import db from "../../../firebase/firebaseConfig";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type EditProfilePageProps = {
  navigation: any;
};

const EditProfilePage: React.FC<EditProfilePageProps> = ({ navigation }) => {
  const userData = userStore();
  const [nickname, updateNickname] = useState(userData.nickname);
  const [modalImagePickerVisible, setmodalImagePickerVisible] = useState(false);
  const [image, setImage] = useState(userData.avatar);

  // image picker logic
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
    setmodalImagePickerVisible(!modalImagePickerVisible);

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
      setmodalImagePickerVisible(!modalImagePickerVisible);
    }
  };

  // OnPress Event that aktivate the function that send the Data and redirect
  const updateData = async () => {
    let imageResult = await image;

    if (imageResult) {
      addData(image, nickname, userData.avatar)
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
  const addData = async (
    imagePath: string,
    imageName: string,
    oldImage: string
  ) => {
    if (oldImage !== "") {
      var fileRef = firebase.storage().refFromURL(oldImage);
      fileRef.delete();
    }

    const response = await fetch(imagePath);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("profilePictures/" + uuidv4());
    const snapshot = await ref.put(blob);
    const imageUrl = await snapshot.ref.getDownloadURL();

    userStore.setState((state) => ({
      ...state,
      avatar: imageUrl,
      nickname: nickname,
    }));

    db.collection("userData")
      .doc(userData.id)
      .set({ ...userData, avatar: imageUrl, nickname: nickname });
  };

  return (
    <Box>
      <Box alignItems="center" marginTop="l">
        <Box alignItems="center" position="relative">
          <Image
            source={
              image === ""
                ? require("../../../assets/images/programmer.png")
                : { uri: image }
            }
            style={{
              width: wp(22),
              height: wp(22),
              borderRadius: theme.borderRadii.xxl,
            }}
          />
          <Box position="absolute" zIndex={1} right={0} bottom={-20}>
            <Pressable
              onPress={() =>
                setmodalImagePickerVisible(!modalImagePickerVisible)
              }
            >
              <Box
                backgroundColor="primarySalmonColor"
                width={wp(10)}
                height={wp(10)}
                alignItems="center"
                justifyContent="center"
                borderRadius="xxl"
                zIndex={1}
              >
                <Camera
                  size={wp(5.8)}
                  color={theme.colors.textOnDark}
                  variant="Broken"
                />
              </Box>
            </Pressable>
          </Box>
        </Box>
        <Box width="50%" flexDirection="row" alignItems="center" marginTop="xl">
          <Box width="80%">
            <Input
              label="Spitzname"
              placeholder={nickname}
              value={nickname}
              onChange={updateNickname}
            />
          </Box>
          <Box marginLeft="m" width="20%">
            <Edit2
              size={wp(6.5)}
              color={theme.colors.iconInactive}
              variant="Broken"
            />
          </Box>
        </Box>
        <Box marginTop="xxl">
          <Button
            onPress={updateData}
            title="Speichern"
            primary={theme.colors.primarySalmonColor}
            color={theme.colors.primarySalmonColor}
          />
        </Box>
      </Box>
      <ImagePickerModal
        setModalVisible={setmodalImagePickerVisible}
        onPressHandler={openImagePicker}
        visible={modalImagePickerVisible}
      />
    </Box>
  );
};
export default EditProfilePage;
