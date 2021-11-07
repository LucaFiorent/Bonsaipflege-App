import React, { FC } from "react";
import Box from "./Box";
import Text from "./Text";
import { Pressable } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import theme from "../../theme/theme";

interface ButtonProps {
  onPress: () => void;
  title: string;
  primary?: string;
}

const ButtonWithIcon: FC<ButtonProps> = ({ onPress, title, primary }) => {
  return (
    <Box alignItems="center" marginVertical="l">
      <Pressable onPress={onPress}>
        <Box
          alignItems="center"
          justifyContent="center"
          paddingVertical="s"
          paddingHorizontal="xl"
          backgroundColor={primary ? "primarySalmonColor" : "primaryGreenColor"}
          borderRadius="xl"
          flexDirection="row"
        >
          <SimpleLineIcons
            name="camera"
            size={24}
            color={theme.colors.textOnDark}
          />
          <Text
            variant="buttonWithIcon"
            style={{ color: primary ? "#fff" : "#385168" }}
            marginLeft="m"
          >
            {title}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};

export default ButtonWithIcon;
