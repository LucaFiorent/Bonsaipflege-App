import { useTheme } from "@shopify/restyle";
import * as React from "react";
import { Image, Pressable, SafeAreaView, ScrollView } from "react-native";
import { Theme } from "../../../theme/theme";

//components
import Box from "../../Common/Box";
import Text from "../../Common/Text";

//stores
import { userStore } from "../../../dataStores/accountStore";

import "react-native-gesture-handler";
import { FC } from "react";

export type FeedProps = {
  bonsai: any;
};

const Feed: FC<FeedProps> = ({ bonsai }) => {
  const theme = useTheme<Theme>();
  const userData = userStore();
  const bonsaiDTasksFertilize = null;
  const bonsaiDTasksWatering = null;

  return (
    <Box marginBottom="xl" key={bonsai.id}>
      {bonsai.userId !== userData.id ? (
        <Box flex={1} flexDirection="row" marginBottom="xs">
          <Box>
            <Box>
              <Image
                source={
                  userData.avatar === ""
                    ? require("../../../assets/images/programmer.png")
                    : { uri: userData.avatar }
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: theme.borderRadii.xxl,
                }}
              />
            </Box>
          </Box>
          <Box marginLeft="m">
            <Text variant="title" marginVertical="xs" color="headline">
              {userData.nickname}
            </Text>
          </Box>
        </Box>
      ) : null}

      <Box flex={1} flexDirection="row" alignItems="center">
        <Box alignItems="center">
          <Image
            source={
              bonsai.image === ""
                ? require("../../../assets/images/bonsai.jpg")
                : { uri: bonsai.image }
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: theme.borderRadii.xxl,
            }}
          />
        </Box>
        <Box
          flex={1}
          flexDirection="row"
          marginHorizontal="l"
          justifyContent="space-between"
        >
          <Box>
            <Box marginVertical="xs">
              <Text fontSize={14}>Typ:</Text>
              <Text fontSize={16}>{bonsai.type}</Text>
            </Box>
            <Box marginVertical="xs">
              <Text fontSize={14}>Form:</Text>
              <Text fontSize={16}>{bonsai.form}</Text>
            </Box>
          </Box>
          <Box>
            <Box
              marginVertical="xs"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Text fontSize={12}>Alter: </Text>
              <Text fontSize={16}> {bonsai.acquisitionDate}</Text>
            </Box>
            <Box
              marginVertical="xs"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Text fontSize={12}>Bewässerung: </Text>
              <Text fontSize={16}>
                {bonsaiDTasksWatering ? bonsaiDTasksWatering : "~"}
              </Text>
            </Box>
            <Box
              marginVertical="xs"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Text fontSize={12}>Düngung: </Text>
              <Text fontSize={16}>
                {bonsaiDTasksFertilize ? bonsaiDTasksFertilize : "~"}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Feed;
