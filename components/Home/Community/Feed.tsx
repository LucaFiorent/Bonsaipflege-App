import { useTheme } from "@shopify/restyle";
import * as React from "react";
import { Image, Pressable } from "react-native";
import { Theme } from "../../../theme/theme";

//components
import Box from "../../Common/Box";
import Text from "../../Common/Text";

import "react-native-gesture-handler";
import { FC } from "react";

import moment from "moment";
import { userStore } from "../../../dataStores/accountStore";

export type FeedProps = {
  navigation?: any;
  bonsai: any;
  userOfBonsai?: any;
  route?: any;
};

const Feed: FC<FeedProps> = ({ navigation, bonsai, userOfBonsai }) => {
  const userData = userStore();
  const theme = useTheme<Theme>();
  const bonsaiDTasksFertilize = null;
  const bonsaiDTasksWatering = null;

  return (
    <Box marginBottom="xl">
      {userOfBonsai && (
        <Pressable
          onPress={() => {
            userOfBonsai.id === userData.id
              ? navigation.navigate("Me")
              : navigation.navigate("CommunityUserProfileView", {
                  userOfBonsai: userOfBonsai,
                });
          }}
        >
          <Box flexDirection="row" marginBottom="s">
            <Box>
              <Box>
                <Image
                  source={
                    userOfBonsai.avatar === ""
                      ? require("../../../assets/images/programmer.png")
                      : { uri: userOfBonsai.avatar }
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
                {userOfBonsai.nickname}
              </Text>
            </Box>
          </Box>
        </Pressable>
      )}
      <Pressable
        onPress={() =>
          userOfBonsai.id === userData.id
            ? navigation.navigate("BonsaiViewStack", {
                screen: "BonsaiView",
                params: {
                  bonsai: bonsai,
                  user: userOfBonsai,
                },
              })
            : navigation.navigate("CommunityStack", {
                screen: "BonsaiView",
                params: {
                  bonsai: bonsai,
                  user: userOfBonsai,
                  pagePath: "community",
                },
              })
        }
      >
        <Box flexDirection="row" alignItems="center">
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
            marginLeft="l"
            justifyContent="space-between"
          >
            <Box width="50%" marginRight="m">
              <Box marginVertical="xs">
                <Text fontSize={14}>Typ:</Text>
                <Text fontSize={16}>{bonsai.type}</Text>
              </Box>
              <Box marginVertical="xs">
                <Text fontSize={14}>Größe:</Text>
                <Text fontSize={16}>{bonsai.size}</Text>
              </Box>
            </Box>
            <Box width="50%">
              <Box marginVertical="xs">
                <Text fontSize={14}>Form:</Text>
                <Text fontSize={16}>{bonsai.form}</Text>
              </Box>
              <Box marginVertical="xs">
                <Text fontSize={14}>Alter:</Text>
                <Text fontSize={16}>
                  {moment(bonsai.acquisitionDate).format("D MMM. YY")}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};
export default Feed;
