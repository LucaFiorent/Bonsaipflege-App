import React, { FC, useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import Box from "./Box";
import Text from "./Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/theme";
import Modal from "react-native-modal";
import { Pressable } from "react-native";

interface ResetProgressModal {
  trickName: string;
  modalVisible: boolean;
  setModalVisible: (prev: boolean) => void;
  resetProgressHandler: (stances: string[]) => void;
  stances: string[];
}

const ResetProgressModal: FC<ResetProgressModal> = ({
  trickName,
  modalVisible,
  setModalVisible,
  resetProgressHandler,
  stances,
}) => {
  const [selectedStances, setSelectedStances] = useState<string[]>([]);

  return (
    <Modal isVisible={modalVisible} backdropOpacity={0.5}>
      <Box
        padding="l"
        margin="l"
        backgroundColor="cardPrimaryBackground"
        borderRadius="m"
      >
        <Text variant="h3" marginBottom="s">
          Reset {trickName} progress?
        </Text>
        <Text variant="body" paddingBottom="m">
          Select which stances you want to reset:
        </Text>

        {stances.map((item) => (
          <Pressable
            key={item}
            onPress={() => {
              console.log(selectedStances);

              if (selectedStances.includes(item))
                setSelectedStances((prev) =>
                  prev.filter((selectedStance) => selectedStance !== item)
                );
              else {
                setSelectedStances((prev) => [...prev, item]);
              }
            }}
          >
            <Box flexDirection="row" alignItems="center" marginBottom="s">
              <Box
                height={24}
                width={24}
                borderWidth={2}
                borderRadius="xxl"
                marginRight="s"
                style={{ padding: 2, borderColor: "#ddd" }}
              >
                <Box
                  backgroundColor={
                    selectedStances.includes(item) ? "primaryColor" : "cardBg2"
                  }
                  width={16}
                  height={16}
                  borderRadius="xxl"
                />
              </Box>
              <Text variant="body">{item}</Text>
            </Box>
          </Pressable>
        ))}

        <Box flexDirection="row" justifyContent="space-between" marginTop="m">
          <Pressable
            onPress={() => {
              setSelectedStances([]);
              resetProgressHandler(selectedStances);
            }}
          >
            <Box
              alignItems="center"
              justifyContent="center"
              marginVertical="s"
              paddingHorizontal="l"
              paddingVertical="s"
              borderRadius="s"
              borderWidth={2}
              borderColor="borderColor"
            >
              <Text variant="body" color="error">
                Reset
              </Text>
            </Box>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedStances([]);
              setModalVisible(false);
            }}
          >
            <Box
              alignItems="center"
              marginVertical="s"
              backgroundColor="cardBg2"
              paddingHorizontal="l"
              paddingVertical="s"
              borderRadius="s"
            >
              <Text variant="body">Cancel</Text>
            </Box>
          </Pressable>
        </Box>
      </Box>
    </Modal>
  );
};

export default ResetProgressModal;
