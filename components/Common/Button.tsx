import React, { FC } from "react";
import Box from "../Common/Box";
import Text from "../Common/Text";
import { Pressable } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  primary?: string;
}

const Button: FC<ButtonProps> = ({ onPress, title, primary }) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        alignItems="center"
        paddingVertical="s"
        paddingHorizontal="xl"
        backgroundColor={primary ? "primarySalmonColor" : "primaryGreenColor"}
        borderRadius="xl"
      >
        <Text variant="button" style={{ color: primary ? "#fff" : "#385168" }}>
          {title}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Button;
