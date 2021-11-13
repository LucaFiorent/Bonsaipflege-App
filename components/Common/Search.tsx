import React, { FC, Dispatch, SetStateAction } from "react";
import Box from "./Box";
import { Pressable, TextInput } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/theme";
import { SimpleLineIcons } from "@expo/vector-icons";

interface SearchProps {
  placeholder: string;
  primaryBg?: boolean;
  searchTrick: Dispatch<SetStateAction<string>>;
  searchValue: string;
}

const Search: FC<SearchProps> = ({
  placeholder,
  primaryBg,
  searchTrick,
  searchValue,
}) => {
  const theme = useTheme<Theme>();
  return (
    <Box
      borderRadius="xxl"
      borderColor="borderColor"
      backgroundColor={primaryBg ? "mainBackground" : "mainBackground"}
      borderWidth={1}
      paddingVertical="s"
      paddingHorizontal="m"
      flexDirection="row"
      justifyContent="space-between"
      marginTop="s"
      marginHorizontal="m"
      marginBottom="s"
    >
      <Box flexDirection="row" flex={1} justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          <SimpleLineIcons
            name="magnifier"
            size={19}
            style={{
              color: theme.colors.borderColor,
            }}
          />
          <TextInput
            // TODO: continue
            onChangeText={(search) => searchTrick(search)}
            selectionColor={theme.colors.borderColor}
            showSoftInputOnFocus={true}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.borderColor}
            style={{
              fontFamily: theme.textVariants.inputTitle.fontFamily,
              fontSize: theme.textVariants.inputTitle.fontSize,
              marginLeft: theme.spacing.m,
            }}
            value={searchValue}
          />
        </Box>
        <Box flexDirection="row" alignItems="center">
          {searchValue !== "" ? (
            <Pressable
              onPress={() => searchTrick("")}
              style={{ marginLeft: theme.spacing.m }}
            >
              <SimpleLineIcons
                name="close"
                size={19}
                style={{
                  color: theme.colors.error,
                }}
              />
            </Pressable>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
