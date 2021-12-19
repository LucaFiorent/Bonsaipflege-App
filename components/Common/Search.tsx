import React, { FC, Dispatch, SetStateAction } from "react";
import Box from "./Box";
import { Pressable, TextInput } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/theme";
import { CloseCircle, SearchNormal1 } from "iconsax-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface SearchProps {
  placeholder: string;
  primaryBg?: boolean;
  setSearchValue: (props: string) => void;
  searchValue: string;
}

const Search: FC<SearchProps> = ({
  placeholder,
  primaryBg,
  setSearchValue,
  searchValue,
}) => {
  const theme = useTheme<Theme>();
  return (
    <Box
      flex={1}
      borderRadius="xxl"
      borderColor="borderColor"
      backgroundColor={primaryBg ? "mainBackground" : "mainBackground"}
      borderWidth={1}
      paddingVertical="s"
      paddingHorizontal="m"
      flexDirection="row"
      justifyContent="space-between"
      marginTop="s"
      marginBottom="s"
    >
      <Box flexDirection="row" flex={1} justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          <SearchNormal1
            size={wp(6.5)}
            color={theme.colors.borderColor}
            variant="Broken"
          />
          <TextInput
            // TODO: continue
            onChangeText={(search) => setSearchValue(search)}
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
              onPress={() => setSearchValue("")}
              style={{ marginLeft: theme.spacing.m }}
            >
              <CloseCircle size={wp(6.5)} color="#FF8A65" variant="Broken" />
            </Pressable>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
