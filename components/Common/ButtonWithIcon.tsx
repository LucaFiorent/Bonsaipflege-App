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
  icon?: string | undefined;
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
          <SimpleLineIcons
            name={icon}
            size={24}
            color={theme.colors.textOnDark}
          />
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
