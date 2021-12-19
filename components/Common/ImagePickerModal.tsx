import React, { FC } from "react";
import Box from "./Box";
import Text from "./Text";
import { Pressable } from "react-native";
import theme from "../../theme/theme";
import Modal from "react-native-modal";
import { Camera, CloseCircle, Folder2 } from "iconsax-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
            width={wp(11)}
            height={wp(11)}
            marginTop="m"
          >
            <CloseCircle
              size={wp(6.5)}
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
                width={wp(18)}
                height={wp(18)}
                alignItems="center"
                justifyContent="center"
              >
                <Camera
                  size={wp(8)}
                  color={theme.colors.textOnDark}
                  variant="Broken"
                />
              </Box>
              <Box marginTop="xs">
                <Text fontSize={wp(2.4)}>Kamera</Text>
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
                width={wp(18)}
                height={wp(18)}
                alignItems="center"
                justifyContent="center"
              >
                <Folder2
                  size={wp(8)}
                  color={theme.colors.textOnDark}
                  variant="Broken"
                />
              </Box>
              <Box marginTop="xs">
                <Text fontSize={wp(2.4)}>Durchsuchen</Text>
              </Box>
            </Box>
          </Pressable>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImagePickerModal;
