//react
import React, { FC, useState } from "react";
import { Pressable } from "react-native";
//expo
//restyle/shopyfi theme
import theme from "../../../theme/theme";
//types
import { BottomSheetButtonProps } from "../../../types/bottomSheetTypes";
//common components
import Box from "../../Common/Box";
import Text from "../../Common/Text";
import { InfoCircle, TickCircle } from "iconsax-react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

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
        <Box flex={1}>
          <Pressable key={title} onPress={() => onPress(title)}>
            <Box
              flex={1}
              alignItems="center"
              flexDirection="row"
              paddingRight="l"
              paddingVertical="m"
              borderRadius="l"
            >
              {selectedValue === title ? (
                <Box marginLeft="m">
                  <TickCircle
                    size={wp(5.3)}
                    color={theme.colors.textOnDark}
                    variant="Broken"
                  />
                </Box>
              ) : (
                <Box
                  marginLeft="m"
                  borderColor="descriptionText"
                  borderWidth={1.2}
                  width={wp(4.3)}
                  height={wp(4.3)}
                  borderRadius="xxl"
                />
              )}
              <Box>
                <Text
                  marginLeft="ms"
                  variant="body"
                  color={
                    selectedValue === title ? "textOnDark" : "descriptionText"
                  }
                >
                  {title}
                </Text>
              </Box>
            </Box>
          </Pressable>
        </Box>
        <Box flex={0}>
          <Pressable onPress={() => setInfoBox(!infoBox)}>
            <Box
              paddingLeft="l"
              paddingRight="m"
              paddingVertical="m"
              alignItems="center"
            >
              <InfoCircle
                style={{
                  transform: [{ rotateX: "180deg" }],
                }}
                size={wp(5.3)}
                color={
                  selectedValue === title
                    ? theme.colors.textOnDark
                    : theme.colors.descriptionText
                }
                variant="Broken"
              />
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
                    Auf Deutsch:
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
                    Auf Deutsch:
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
