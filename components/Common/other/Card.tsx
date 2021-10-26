import React, { FC } from "react";
import Box from "../Common/Box";
import { ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card: FC<CardProps> = ({ children, style }) => {
  return (
    <Box
      style={style}
      padding="l"
      marginHorizontal="m"
      marginBottom="l"
      backgroundColor="cardPrimaryBackground"
      borderRadius="m"
      borderColor="cardBorder"
      borderWidth={1}
    >
      {children}
    </Box>
  );
};

export default Card;
