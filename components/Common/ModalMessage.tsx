import React, { FC } from "react";
import Box from "./Box";
import Text from "./Text";
import { Pressable } from "react-native";
import theme from "../../theme/theme";
import Modal from "react-native-modal";
import { Danger } from "iconsax-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface ButtonProps {
  onPressHandler?: () => void;
  setModalVisible: (props: boolean) => void;
  visible: boolean;
  data?: any;
  type: string;
  title?: string;
  message?: string;
  primary?: string;
  category?: string;
}

const ModalMessage: FC<ButtonProps> = ({
  onPressHandler,
  setModalVisible,
  visible,
  data,
  type,
  title,
  category,
  message,
  primary,
}) => {
  return (
    <Modal backdropOpacity={0.5} isVisible={visible}>
      <Box
        backgroundColor="mainBackground"
        borderColor="error"
        borderTopWidth={wp(3.5)}
        borderRadius="m"
        justifyContent="center"
        alignItems="center"
        padding="xl"
        margin="xs"
      >
        <Box>
          <Box alignItems="center">
            <Box
              width={wp(22)}
              height={wp(22)}
              alignItems="center"
              justifyContent="center"
              backgroundColor="error"
              borderRadius="xl"
              marginBottom="l"
              style={{ marginTop: wp(-20) }}
            >
              <Danger
                size={wp(13)}
                color={theme.colors.textOnDark}
                variant="Broken"
              />
            </Box>
            <Box marginTop="xl">
              <Text
                variant="h1"
                textTransform="uppercase"
                fontWeight="bold"
                textAlign="center"
                style={{ color: theme.colors.text }}
              >
                {title}
              </Text>
            </Box>
          </Box>

          {type === "delete" ? (
            <Box
              marginTop="xl"
              marginBottom="xxl"
              flexDirection="row"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
            >
              <Text variant="body" style={{ color: theme.colors.text }}>
                Möchtest du wirklich
                {category === "bonsai"
                  ? " den Bonsai"
                  : category === "work"
                  ? " die Arbeit vom"
                  : null}
              </Text>
              <Text variant="title" style={{ color: primary }}>
                {` "` + data + `" `}
              </Text>
              <Text variant="body" style={{ color: theme.colors.text }}>
                löschen?
              </Text>
            </Box>
          ) : type === "error" ? (
            <Box
              marginTop="xl"
              marginBottom="xxl"
              flexDirection="row"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                variant="body"
                textAlign="center"
                style={{ color: theme.colors.text }}
              >
                {message}
              </Text>
            </Box>
          ) : null}
        </Box>
        <Box flexDirection="row">
          {type === "delete" ? (
            <Pressable onPress={onPressHandler}>
              <Box
                alignItems="center"
                paddingVertical="s"
                paddingHorizontal="xl"
                backgroundColor="greyBackground"
                borderRadius="xl"
                marginRight="l"
              >
                <Text variant="button" color="textHighContrast">
                  löschen
                </Text>
              </Box>
            </Pressable>
          ) : null}
          <Pressable onPress={() => setModalVisible(!visible)}>
            {type === "delete" ? (
              <Box
                alignItems="center"
                paddingVertical="s"
                paddingHorizontal="xl"
                backgroundColor="error"
                borderRadius="xl"
              >
                <Text variant="button" color="textOnDark">
                  Abbrechen
                </Text>
              </Box>
            ) : type === "error" ? (
              <Box
                alignItems="center"
                paddingVertical="s"
                paddingHorizontal="xl"
                backgroundColor="error"
                borderRadius="xl"
              >
                <Text variant="button" color="textOnDark">
                  Schließen
                </Text>
              </Box>
            ) : null}
          </Pressable>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalMessage;
