//react
import React, { FC, useState } from "react";
import { Pressable } from "react-native";
//expo
import { SimpleLineIcons } from "@expo/vector-icons";
//restyle/shopyfi theme
import theme from "../../../theme/theme";
//types
import { BottomSheetButtonProps } from "../../../types/bottomSheetTypes";
//common components
import Box from "../../Common/Box";
import Text from "../../Common/Text";

const BottomSheetButton: FC<BottomSheetButtonProps> = ({
  title,
  onPress,
  selectedValue,
  currentlyEditing,
  data,
}) => {
  //set toggle info box
  const [infoBox, setInfoBox] = useState(false);

  return (
    <Box
      key={title}
      marginBottom="s"
      backgroundColor={
        selectedValue === title
          ? "primaryGreenColor"
          : "primaryLightSalmonColor"
      }
      borderRadius="l"
    >
      <Box flexDirection="row" key={title}>
        <Box flex={0}>
          <Pressable onPress={() => setInfoBox(!infoBox)}>
            <Box paddingLeft="l" paddingRight="m" paddingVertical="m">
              <SimpleLineIcons
                name="info"
                size={20}
                color={
                  selectedValue === title
                    ? theme.colors.textOnDark
                    : theme.colors.descriptionText
                }
              />
            </Box>
          </Pressable>
        </Box>
        <Box flex={1}>
          <Pressable key={title} onPress={() => onPress(title)}>
            <Box
              flex={1}
              justifyContent="space-between"
              flexDirection="row"
              paddingRight="l"
              paddingVertical="m"
              borderRadius="l"
            >
              <Box>
                <Text
                  marginLeft="s"
                  variant="body"
                  color={
                    selectedValue === title ? "textOnDark" : "descriptionText"
                  }
                >
                  {title}
                </Text>
              </Box>
              {selectedValue === title ? (
                <Box>
                  <SimpleLineIcons
                    name="check"
                    size={20}
                    color={theme.colors.textOnDark}
                  />
                </Box>
              ) : null}
            </Box>
          </Pressable>
        </Box>
      </Box>

      {infoBox && currentlyEditing === "Größen"
        ? data.map((dataItem: any) =>
            dataItem.sizeJP === title ? (
              <Box
                key={dataItem.id}
                flexDirection="row"
                justifyContent="space-between"
                marginHorizontal="l"
                marginBottom="m"
              >
                <Box>
                  <Text
                    color={
                      selectedValue === title ? "textOnDark" : "descriptionText"
                    }
                  >
                    In Deutsch:
                  </Text>
                  <Text
                    color={
                      selectedValue === title ? "textOnDark" : "descriptionText"
                    }
                  >
                    {dataItem.sizeDE}
                  </Text>
                </Box>
                <Box>
                  <Text
                    color={
                      selectedValue === title ? "textOnDark" : "descriptionText"
                    }
                  >
                    Beschreibung:
                  </Text>
                  <Text
                    color={
                      selectedValue === title ? "textOnDark" : "descriptionText"
                    }
                  >
                    {dataItem.description}
                  </Text>
                </Box>
              </Box>
            ) : null
          )
        : null}
      {infoBox && currentlyEditing === "Formen"
        ? data.map((dataItem: any) =>
            dataItem.formJP === title ? (
              <Box
                key={dataItem.id}
                flexDirection="row"
                justifyContent="space-between"
                marginHorizontal="l"
                marginBottom="m"
              >
                <Box>
                  <Text
                    color={
                      selectedValue === title ? "textOnDark" : "descriptionText"
                    }
                  >
                    In Deutsch:
                  </Text>
                  <Text
                    color={
                      selectedValue === title ? "textOnDark" : "descriptionText"
                    }
                  >
                    {dataItem.formDE}
                  </Text>
                </Box>
              </Box>
            ) : null
          )
        : null}
    </Box>
  );
};
export default BottomSheetButton;
