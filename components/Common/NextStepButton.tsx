import React, { FC } from "react";
import Box from "./Box";
import Text from "./Text";
import { Pressable } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import theme from "../../theme/theme";

interface ButtonProps {
  onPress: () => void;
  primary?: string;
  title?: string;
  icon?: any;
}

const NextStepButton: FC<ButtonProps> = ({ onPress, primary, title, icon }) => {
  return (
    <Box position="absolute" right={15} bottom={20}>
      <Pressable onPress={onPress}>
        <Box flexDirection="row" alignItems="center">
          <Text marginRight="m" color="text">
            {title}
          </Text>
          <Box
            backgroundColor={
              primary ? "primarySalmonColor" : "primaryGreenColor"
            }
            justifyContent="center"
            alignItems="center"
            borderRadius="xxl"
            width={54}
            height={54}
          >
            <SimpleLineIcons
              size={24}
              name={icon}
              color={theme.colors.textOnDark}
            />
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};

export default NextStepButton;
