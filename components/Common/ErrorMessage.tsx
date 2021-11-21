import React, { FC, useState } from "react";
import Box from "./Box";
import Text from "./Text";
import { Alert, Pressable } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import theme from "../../theme/theme";
import Modal from "react-native-modal";

interface ButtonProps {
  setModalVisible: () => void;
  visible: boolean;
  title: string;
  message: string;
  primary?: string;
}

const ErrorMessage: FC<ButtonProps> = ({
  visible,
  setModalVisible,
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
          <Box marginTop="xl" marginBottom="m">
            <Text variant="body" style={{ color: primary }}>
              {message}
            </Text>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ErrorMessage;
