import React, { FC, useState } from "react";
import Box from "./Box";
import Text from "./Text";
import { Alert, Pressable } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import theme from "../../theme/theme";
import Modal from "react-native-modal";
import BonsaiView from "../BonsaiView/BonsaiView";
import Button from "./Button";
import { Camera, CloseCircle, Folder2 } from "iconsax-react-native";

interface ButtonProps {
  onPressHandler: (prop: string) => void;
  setModalVisible: (prop: boolean) => void;
  visible: boolean;
}

const ImagePickerModal: FC<ButtonProps> = ({
  onPressHandler,
  setModalVisible,
  visible,
}) => {
  return (
    <Modal backdropOpacity={0.8} isVisible={visible}>
      <Box position="absolute" top={0} alignSelf="flex-end">
        <Pressable onPress={() => setModalVisible(!visible)}>
          <Box
            backgroundColor="error"
            justifyContent="center"
            alignItems="center"
            borderRadius="xxl"
            width={54}
            height={54}
            marginTop="m"
          >
            <CloseCircle
              size={26}
              variant="Broken"
              color={theme.colors.textOnDark}
            />
          </Box>
        </Pressable>
      </Box>

      <Box flexDirection="row" justifyContent="center">
        <Box
          paddingHorizontal="l"
          paddingBottom="m"
          paddingTop="l"
          backgroundColor="mainBackground"
          borderRadius="m"
          justifyContent="center"
          alignItems="center"
          margin="l"
        >
          <Pressable onPress={() => onPressHandler("camera")}>
            <Box alignItems="center">
              <Box
                backgroundColor="primarySalmonColor"
                borderRadius="m"
                width={80}
                height={80}
                alignItems="center"
                justifyContent="center"
              >
                <Camera
                  size={40}
                  color={theme.colors.textOnDark}
                  variant="Broken"
                />
              </Box>
              <Box marginTop="xs">
                <Text fontSize={10}>Kamera</Text>
              </Box>
            </Box>
          </Pressable>
        </Box>
        <Box
          backgroundColor="mainBackground"
          borderRadius="m"
          justifyContent="center"
          alignItems="center"
          paddingHorizontal="l"
          paddingBottom="m"
          paddingTop="l"
          margin="l"
        >
          <Pressable onPress={() => onPressHandler("library")}>
            <Box alignItems="center">
              <Box
                backgroundColor="primarySalmonColor"
                borderRadius="m"
                width={80}
                height={80}
                alignItems="center"
                justifyContent="center"
              >
                <Folder2
                  size={40}
                  color={theme.colors.textOnDark}
                  variant="Broken"
                />
              </Box>
              <Box marginTop="xs">
                <Text fontSize={10}>Durchsuchen</Text>
              </Box>
            </Box>
          </Pressable>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImagePickerModal;
