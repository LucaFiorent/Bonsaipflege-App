import React, { FC } from "react";
import Box from "../../../../Common/Box";
import Text from "../../../../Common/Text";
import { Pressable } from "react-native";
import { WorkElementProps } from "../../../../../types/WorkViewTypes";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const WorkElement: FC<WorkElementProps> = ({
  item,
  selectedWork,
  setSelectedWorks,
}) => {
  return (
    <>
      <Pressable onPress={() => setSelectedWorks(item)}>
        <Box
          minWidth={wp(25)}
          flexDirection="row"
          alignItems="center"
          marginBottom="ms"
        >
          <Box
            height={wp(5)}
            width={wp(5)}
            borderWidth={2}
            borderRadius="xxl"
            marginRight="s"
            style={{ padding: wp(0.56), borderColor: "#ddd" }}
          >
            <Box
              alignSelf="center"
              backgroundColor={
                selectedWork.includes(item)
                  ? "primaryGreenColor"
                  : "greyBackground"
              }
              width={wp(3)}
              height={wp(3)}
              borderRadius="xxl"
            />
          </Box>
          <Text variant="body" fontSize={wp(3)}>
            {item}
          </Text>
        </Box>
      </Pressable>
    </>
  );
};

export default WorkElement;
