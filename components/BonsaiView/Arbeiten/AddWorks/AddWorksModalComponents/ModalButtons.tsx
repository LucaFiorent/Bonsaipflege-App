import React, { FC } from "react";
import Box from "../../../../Common/Box";
import Text from "../../../../Common/Text";
import { Pressable } from "react-native";
import { ModalButtonsProps } from "../../../../../types/WorkViewTypes";

const ModalButtons: FC<ModalButtonsProps> = ({
  onSend,
  setModalVisible,
  visible,
}) => {
  return (
    <>
      <Box
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        marginTop="l"
        marginBottom="xl"
        marginHorizontal="s"
      >
        <Pressable onPress={() => onSend()}>
          <Box
            alignItems="center"
            paddingVertical="s"
            paddingHorizontal="l"
            backgroundColor="primarySalmonColor"
            borderRadius="xl"
          >
            <Text variant="button" fontSize={16} color="textOnDark">
              Hinzufügen
            </Text>
          </Box>
        </Pressable>

        <Pressable onPress={() => setModalVisible(!visible)}>
          <Box
            alignItems="center"
            paddingVertical="s"
            paddingHorizontal="l"
            backgroundColor="greyBackground"
            borderRadius="xl"
          >
            <Text variant="button" fontSize={16} color="textHighContrast">
              Abbrechen
            </Text>
          </Box>
        </Pressable>
      </Box>
    </>
  );
};

export default ModalButtons;
