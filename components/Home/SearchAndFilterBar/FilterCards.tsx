import * as React from "react";
import { FC } from "react";
import { Pressable } from "react-native";
import Box from "../../Common/Box";
import Text from "../../Common/Text";
import theme from "../../../theme/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TickCircle } from "iconsax-react-native";

type FilterCardsProps = {
  selectedFilters: string;
  filterItem: string;
  filterOnPress: (props: string) => void;
};

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
        minWidth={wp(20.5)}
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
            // paddingHorizontal="xs"
            // paddingTop="xs"
            // paddingBottom="s"
            borderTopEndRadius="l"
            borderTopLeftRadius="l"
            width={wp(5)}
            height={wp(5)}
            alignItems="center"
            justifyContent="center"
          >
            <TickCircle
              size={wp(3.5)}
              color={theme.colors.textOnDark}
              variant="Broken"
            />
          </Box>
        )}
        <Text variant="button" fontSize={wp(2.5)} color="textOnDark">
          {filterItem}
        </Text>
      </Box>
    </Pressable>
  );
};

export default FilterCards;
