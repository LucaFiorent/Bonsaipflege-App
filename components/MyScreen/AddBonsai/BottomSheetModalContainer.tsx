//react
import * as React from "react";
import { FC } from "react";

//libraries
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

//common components
import Box from "../../Common/Box";
import BottomSheetButton from "./BottomSheetButton";

//types
import { BottomSheetModalContainerProps } from "../../../types/bottomSheetTypes";

const BottomSheetModalContainer: FC<BottomSheetModalContainerProps> = ({
  values,
  onPress,
  selectedValue,
  currentlyEditing,
  data,
}) => {
  return (
    <BottomSheetScrollView>
      <Box marginHorizontal="m">
        {values.map((item) => (
          <BottomSheetButton
            key={item}
            title={item}
            onPress={onPress}
            data={data}
            currentlyEditing={currentlyEditing}
            selectedValue={selectedValue}
          />
        ))}
      </Box>
    </BottomSheetScrollView>
  );
};
export default BottomSheetModalContainer;
