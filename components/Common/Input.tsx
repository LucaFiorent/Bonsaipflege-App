import React, { Dispatch, FC } from "react";
import { SetStateAction } from "react-native/node_modules/@types/react";
import Text from "./Text";
import { TextInput } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/theme";
import Box from "./Box";
import { Danger } from "iconsax-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface InputP {
  label: string;
  placeholder: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  color?: string;
  inputMessage?: string;
  type?: string;
}

const Input: FC<InputP> = ({
  label,
  placeholder,
  value,
  onChange,
  color,
  inputMessage,
  type,
}) => {
  const theme = useTheme<Theme>();
  return (
    <Box marginBottom="l">
      <Text
        variant="inputTitle"
        marginBottom="xs"
        style={{ color: color ? color : theme.colors.headline }}
      >
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={{
          fontSize: wp(3.5),
          color: !value ? theme.colors.placeholderColor : theme.colors.text,
          borderColor: theme.colors.borderInput,
          paddingHorizontal: theme.spacing.xs,
          paddingBottom: theme.spacing.xs,
          paddingTop: theme.spacing.xs,
          borderBottomWidth: 1,
        }}
      />
      {inputMessage ? (
        <Box marginTop="xs" flexDirection="row">
          <Danger size={wp(5)} color={color} />
          <Text
            variant="inputTitle"
            style={color ? { color: color } : null}
            marginLeft="s"
          >
            {inputMessage}
          </Text>
        </Box>
      ) : null}
    </Box>
  );
};

export default Input;
