import React, { FC } from "react";
import Box from "../Common/Box";
import Text from "../Common/Text";
import { Pressable } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  primary?: string;
  color?: string;
}

const Button: FC<ButtonProps> = ({ onPress, title, primary, color }) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        alignItems="center"
        paddingVertical="s"
        paddingHorizontal="xl"
        backgroundColor={primary ? "primarySalmonColor" : `${color}`}
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
