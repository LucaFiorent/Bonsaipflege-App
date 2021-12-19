import * as React from "react";
import { Pressable } from "react-native";
import Box from "../../Common/Box";
import Text from "../../Common/Text";
import Search from "../../Common/Search";
import FilterCards from "./FilterCards";
import { Setting3 } from "iconsax-react-native";
import theme from "../../../theme/theme";
import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type SearchAndFilterBarProps = {
  searchValue: string;
  setSearchValue: (props: string) => void;
  openFilter: (props: boolean) => void;
  filterOpen: any;
  selectedFilters: any;
  allFilter: any;
  deleteSelectedFilters: (props: string) => void;
  setSelectedFilterLogic: (props: string) => void;
};

const SearchAndFilterBar: FC<SearchAndFilterBarProps> = ({
  searchValue,
  setSearchValue,
  openFilter,
  filterOpen,
  selectedFilters,
  allFilter,
  deleteSelectedFilters,
  setSelectedFilterLogic,
}) => {
  return (
    <Box>
      <Box
        marginVertical="s"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Search
          primaryBg={true}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Suche nach Bonsais..."
        />
        <Pressable onPress={() => openFilter(!filterOpen)}>
          <Box
            marginLeft="m"
            width={wp(12)}
            height={wp(12)}
            alignItems="center"
            justifyContent="center"
            borderRadius="xxl"
            backgroundColor="mainBackground"
            borderWidth={1}
            borderColor={filterOpen ? "primaryGreenColor" : "iconInactive"}
          >
            {selectedFilters.length > 0 ? (
              <Box
                position="absolute"
                right={-5}
                top={-5}
                borderRadius="xl"
                backgroundColor="error"
              >
                <Text
                  variant="title"
                  fontSize={wp(3.5)}
                  color="textOnDark"
                  paddingVertical="xxs"
                  paddingHorizontal="s"
                >
                  {searchValue || selectedFilters ? "+" : null}
                </Text>
              </Box>
            ) : null}
            <Setting3
              size={wp(6.5)}
              color={
                filterOpen
                  ? theme.colors.primaryGreenColor
                  : theme.colors.iconInactive
              }
              variant="Outline"
            />
          </Box>
        </Pressable>
      </Box>
      <Box
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        marginBottom="s"
      >
        {filterOpen &&
          allFilter.map((item: string, index: number) => {
            return (
              <Box marginRight="s" key={index + uuidv4()}>
                <FilterCards
                  selectedFilters={selectedFilters}
                  filterItem={item}
                  filterOnPress={setSelectedFilterLogic}
                />
              </Box>
            );
          })}
      </Box>
      {filterOpen && selectedFilters.length > 0 && (
        <Box>
          <Text variant="inputTitle" color="text" marginBottom="ms">
            Ausgewählte Filter
          </Text>
          <Box
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="flex-start"
            marginBottom="s"
          >
            {selectedFilters.length > 0
              ? selectedFilters.map((item: string, index: number) => {
                  return (
                    <Box marginRight="s" key={index + uuidv4()}>
                      <FilterCards
                        selectedFilters={selectedFilters}
                        filterItem={item}
                        filterOnPress={deleteSelectedFilters}
                      />
                    </Box>
                  );
                })
              : null}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SearchAndFilterBar;
