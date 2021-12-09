import React, { Dispatch, FC } from "react";
import { SetStateAction } from "react-native/node_modules/@types/react";
import Text from "./Text";
import { TextInput } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/theme";
import Box from "./Box";
import { SimpleLineIcons } from "@expo/vector-icons";

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
          fontSize: 16,
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
          <SimpleLineIcons name="exclamation" size={18} color={color} />
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
