import React, { FC, useState } from "react";
import Box from "./Box";
import Text from "./Text";
import { Pressable } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import theme from "../../theme/theme";
import Modal from "react-native-modal";

interface ButtonProps {
  onPressHandler: () => void;
  setModalVisible: (props: boolean) => void;
  visible: boolean;
  data?: any;
  type: string;
  title?: string;
  message?: string;
  primary?: string;
  category?: string;
}

const ErrorMessage: FC<ButtonProps> = ({
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
        borderTopWidth={15}
        borderRadius="m"
        justifyContent="center"
        alignItems="center"
        padding="xl"
        margin="xs"
      >
        <Box>
          <Box alignItems="center">
            <Box
              backgroundColor="error"
              padding="l"
              borderRadius="xl"
              position="absolute"
              marginBottom="l"
              top={-90}
            >
              <SimpleLineIcons
                name="exclamation"
                size={50}
                color={theme.colors.textOnDark}
              />
            </Box>
            <Box marginTop="xl">
              <Text
                variant="h1"
                fontSize={23}
                fontWeight="bold"
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
              <Text
                variant="body"
                fontSize={19}
                style={{ color: theme.colors.text }}
              >
                Möchten Sie wirklich
                {category === "bonsai"
                  ? " den Bonsai"
                  : category === "work"
                  ? " die arbeit vom"
                  : null}
              </Text>
              <Text variant="title" fontSize={19} style={{ color: primary }}>
                {` "` + data + `" `}
              </Text>
              <Text
                variant="body"
                fontSize={19}
                style={{ color: theme.colors.text }}
              >
                Löschen?
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
                fontSize={20}
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
                <Text variant="button" fontSize={16} color="textHighContrast">
                  Löschen
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
                <Text variant="button" fontSize={16} color="textOnDark">
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
                <Text variant="button" fontSize={16} color="textOnDark">
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

export default ErrorMessage;
