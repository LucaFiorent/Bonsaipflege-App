import React, { FC } from "react";
import Box from "./Box";
import Text from "./Text";
import { Pressable } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface ButtonProps {
  onPress: () => void;
  primary?: string;
  title?: string;
  icon?: any;
  index?: number;
}

const NextStepButton: FC<ButtonProps> = ({
  onPress,
  primary,
  title,
  icon,
  index,
}) => {
  return (
    <Box position="absolute" right={15} bottom={20} zIndex={index}>
      <Pressable onPress={onPress}>
        <Box
          flexDirection="row"
          alignItems="center"
          backgroundColor="mainBackground"
          borderRadius="xl"
        >
          <Text marginLeft="m" marginRight="m" color="text">
            {title}
          </Text>
          <Box
            backgroundColor={
              primary ? "primarySalmonColor" : "primaryGreenColor"
            }
            justifyContent="center"
            alignItems="center"
            borderRadius="xxl"
            width={wp(12)}
            height={wp(12)}
          >
            {icon}
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};

export default NextStepButton;
