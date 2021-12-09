import React, { FC } from "react";
import Box from "../../../../Common/Box";
import Text from "../../../../Common/Text";
import { Pressable } from "react-native";
import { WorkElementProps } from "../../../../../types/WorkViewTypes";

const WorkElement: FC<WorkElementProps> = ({
  item,
  selectedWork,
  setSelectedWorks,
}) => {
  return (
    <>
      <Pressable onPress={() => setSelectedWorks(item)}>
        <Box
          minWidth="30%"
          flexDirection="row"
          alignItems="center"
          marginBottom="ms"
        >
          <Box
            height={20}
            width={20}
            borderWidth={2}
            borderRadius="xxl"
            marginRight="s"
            style={{ padding: 2, borderColor: "#ddd" }}
          >
            <Box
              alignSelf="center"
              backgroundColor={
                selectedWork.includes(item)
                  ? "primaryGreenColor"
                  : "greyBackground"
              }
              width={12}
              height={12}
              borderRadius="xxl"
            />
          </Box>
          <Text variant="body" fontSize={13}>
            {item}
          </Text>
        </Box>
      </Pressable>
    </>
  );
};

export default WorkElement;
