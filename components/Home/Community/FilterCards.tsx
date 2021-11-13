import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Pressable } from "react-native";
import Box from "../../../components/Common/Box";
import Text from "../../../components/Common/Text";
import { userBonsaisStore, userStore } from "../../../dataStores/accountStore";
import theme from "../../../theme/theme";
import { filterData } from "../../../data/bonsaiFilter";

import { SimpleLineIcons } from "@expo/vector-icons";

type FilterCardsProps = {
  selectedFilter: string;
  filterItem: string;
  filterOnPress: (filterItem: string) => string;
};

//   onPress={() => filterOnPress(filterItem)}
//   key={filterData.indexOf(filterItem)}

const FilterCards: FC<FilterCardsProps> = ({
  selectedFilter,
  filterItem,
  filterOnPress,
}) => {
  return (
    <Pressable onPress={() => filterOnPress(filterItem)}>
      <Box
        marginVertical="xs"
        key={filterData.indexOf(filterItem)}
        backgroundColor={
          selectedFilter === filterItem
            ? "primaryGreenColor"
            : "primarySalmonColor"
        }
        borderRadius="s"
        paddingHorizontal="l"
        paddingVertical="s"
        alignSelf="stretch"
        minWidth="49%"
        flexDirection="row"
        alignItems="center"
        // justifyContent="center"
      >
        {selectedFilter === filterItem && (
          <Box position="absolute" right={15}>
            <SimpleLineIcons
              name="check"
              size={20}
              color={theme.colors.textOnDark}
            />
          </Box>
        )}
        <Text variant="h1" color="textOnDark">
          {filterItem}
        </Text>
      </Box>
    </Pressable>
  );
};

export default FilterCards;
