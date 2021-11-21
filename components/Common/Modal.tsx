import React, { FC, useState } from "react";
import Box from "./Box";
import Text from "./Text";
import { Alert, Pressable } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import theme from "../../theme/theme";
import Modal from "react-native-modal";
import BonsaiView from "../Home/Community/BonsaiView";
import Button from "./Button";

interface ButtonProps {
  onPressHandler: () => void;
  setModalVisible: () => void;
  visible: boolean;
  data?: string;
  type: string;
  title?: string;
  message?: string;
  primary?: string;
}

const ErrorMessage: FC<ButtonProps> = ({
  visible,
  onPressHandler,
  setModalVisible,
  data,
  type,
  title,
  message,
  primary,
}) => {
  return (
    <Modal backdropOpacity={0.5} isVisible={visible}>
      <Box
        backgroundColor="mainBackground"
        borderColor="error"
        borderWidth={1}
        borderRadius="l"
        justifyContent="center"
        alignItems="center"
        padding="l"
        margin="xl"
      >
        <Box>
          <Box flexDirection="row" justifyContent="space-between">
            <Box>
              <Text variant="title" style={{ color: primary }}>
                {title}
              </Text>
            </Box>
            <Box>
              <Pressable onPress={() => setModalVisible(!visible)}>
                <SimpleLineIcons name="close" size={24} color={primary} />
              </Pressable>
            </Box>
          </Box>

          {type === "delete" ? (
            <Box
              marginTop="xl"
              marginBottom="m"
              flexDirection="row"
              flexWrap="wrap"
              alignItems="center"
            >
              <Text variant="body" style={{ color: primary }}>
                Möchten Sie wirklich Bonsai
              </Text>
              <Text variant="title" style={{ color: primary }}>
                {" " + data + " "}
              </Text>
              <Text variant="body" style={{ color: primary }}>
                Löschen?
              </Text>
            </Box>
          ) : null}
        </Box>
        <Box flexDirection="row">
          <Button
            onPress={onPressHandler}
            title={type === "delete" ? "Löschen" : ""}
            primary={type === "delete" ? theme.colors.error : ""}
          />
          <Button
            onPress={() => setModalVisible(!visible)}
            title="Abbrechen"
            primary={type === "delete" ? theme.colors.error : ""}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ErrorMessage;
