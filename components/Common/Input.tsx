import React, { Dispatch, FC } from "react";
import { SetStateAction } from "react-native/node_modules/@types/react";
import Text from "./Text";
import { TextInput } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/theme";
import Box from "./Box";

interface InputP {
  label: string;
  placeholder: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const Input: FC<InputP> = ({ label, placeholder, value, onChange }) => {
  const theme = useTheme<Theme>();
  return (
    <Box marginBottom="l">
      <Text
        variant="inputTitle"
        marginBottom="xs"
        style={{ color: theme.colors.headline }}
      >
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={{
          fontSize: 16,
          color: !value ? theme.colors.placeholderColor : theme.colors.text,
          borderColor: theme.colors.borderInput,
          paddingHorizontal: theme.spacing.xs,
          paddingBottom: theme.spacing.xs,
          paddingTop: theme.spacing.xs,
          borderBottomWidth: 1,
        }}
      />
    </Box>
  );
};

export default Input;
