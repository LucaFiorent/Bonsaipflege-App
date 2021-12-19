import React, { FC } from "react";
import Box from "./Box";
import Text from "./Text";
import { Pressable } from "react-native";
import { Folder2 } from "iconsax-react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  primary?: string;
  icon?: any;
}

const ButtonWithIcon: FC<ButtonProps> = ({ onPress, title, primary, icon }) => {
  return (
    <Box alignItems="center" marginVertical="l" marginHorizontal="m">
      <Pressable onPress={onPress}>
        <Box
          alignItems="center"
          justifyContent="center"
          paddingVertical="s"
          paddingHorizontal="l"
          backgroundColor={primary ? "primarySalmonColor" : "primaryGreenColor"}
          borderRadius="xl"
          flexDirection="row"
        >
          <Box>{icon}</Box>

          <Text
            variant="buttonWithIcon"
            style={{ color: primary ? "#fff" : "#385168" }}
            marginLeft="s"
          >
            {title}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};

export default ButtonWithIcon;
