import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Pressable } from "react-native";
import Box from "../../../components/Common/Box";
import Text from "../../../components/Common/Text";
import { userBonsaisStore, userStore } from "../../../dataStores/accountStore";
import theme from "../../../theme/theme";
import { filterData } from "../../../data/bonsaiFilter";

import { SimpleLineIcons } from "@expo/vector-icons";
import { State } from "react-native-gesture-handler";

type FilterCardsProps = {
  selectedFilters: string;
  filterItem: string;
  filterOnPress: (filterItem: string) => string[];
};

//   onPress={() => filterOnPress(filterItem)}
//   key={filterData.indexOf(filterItem)}

const FilterCards: FC<FilterCardsProps> = ({
  selectedFilters,
  filterItem,
  filterOnPress,
}) => {
  return (
    <Pressable onPress={() => filterOnPress(filterItem)}>
      <Box
        alignSelf="stretch"
        justifyContent="center"
        flexDirection="row"
        backgroundColor={
          selectedFilters.includes(filterItem)
            ? "primaryGreenColor"
            : "primarySalmonColor"
        }
        minWidth="23%"
        marginVertical="xs"
        paddingVertical="s"
        paddingHorizontal="s"
        borderRadius="l"
      >
        {selectedFilters.includes(filterItem) && (
          <Box
            position="absolute"
            right={0.1}
            top={-6}
            backgroundColor="primaryGreenColor"
            paddingHorizontal="xs"
            paddingTop="xs"
            paddingBottom="s"
            borderTopEndRadius="l"
            borderTopLeftRadius="l"
          >
            <SimpleLineIcons
              name="check"
              size={12}
              color={theme.colors.textOnDark}
            />
          </Box>
        )}
        <Text variant="button" fontSize={12} color="textOnDark">
          {filterItem}
        </Text>
      </Box>
    </Pressable>
  );
};

export default FilterCards;
