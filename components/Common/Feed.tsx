import { useTheme } from "@shopify/restyle";
import * as React from "react";
import { Image, Pressable } from "react-native";
import { Theme } from "../../theme/theme";

//components
import Box from "./Box";
import Text from "./Text";

import "react-native-gesture-handler";
import { FC } from "react";

import moment from "moment";
import { userStore } from "../../dataStores/accountStore";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BoxSearch } from "iconsax-react-native";

export type FeedProps = {
  navigation?: any;
  bonsai: any;
  userOfBonsai?: any;
  route?: any;
};

const Feed: FC<FeedProps> = ({ navigation, bonsai, userOfBonsai }) => {
  const userData = userStore();
  const theme = useTheme<Theme>();

  return (
    <Box>
      {userOfBonsai && (
        <Box
          zIndex={2}
          alignSelf="flex-end"
          style={{ marginBottom: wp(-8) }}
          alignContent="flex-start"
        >
          <Pressable
            onPress={() => {
              userOfBonsai.id === userData.id
                ? navigation.navigate("Me")
                : navigation.navigate("CommunityUserProfileView", {
                    userOfBonsai: userOfBonsai,
                  });
            }}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              borderRadius="xxl"
              backgroundColor="mainBackground"
            >
              <Box paddingLeft="m">
                <Text variant="title" color="headline" fontSize={wp(3)}>
                  {userOfBonsai.nickname}
                </Text>
              </Box>
              <Box marginLeft="m" paddingVertical="xss" paddingRight="xss">
                <Image
                  source={
                    userOfBonsai.avatar === ""
                      ? require("../../assets/images/programmer.png")
                      : { uri: userOfBonsai.avatar }
                  }
                  style={{
                    width: wp(7),
                    height: wp(7),
                    borderRadius: theme.borderRadii.xxl,
                  }}
                />
              </Box>
            </Box>
          </Pressable>
        </Box>
      )}
      <Box
        marginTop="m"
        marginBottom="m"
        backgroundColor="mainBackground"
        borderTopEndRadius="m"
        borderBottomEndRadius="m"
        borderTopStartRadius="xxl"
        borderBottomStartRadius="xxl"
        padding="xs"
        position="relative"
        justifyContent="center"
      >
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
                    ? require("../../assets/images/bonsai.jpg")
                    : { uri: bonsai.image }
                }
                style={{
                  width: wp(25),
                  height: wp(25),
                  borderRadius: theme.borderRadii.xxl,
                }}
              />
            </Box>
            <Box
              flex={1}
              flexDirection="row"
              marginLeft="l"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box width={wp(25)} marginRight="m">
                <Box marginBottom="s">
                  <Text fontSize={wp(3.2)}>Typ:</Text>
                  <Text fontSize={wp(3.5)}>{bonsai.type}</Text>
                </Box>
                <Box>
                  <Text fontSize={wp(3.2)}>Größe:</Text>
                  <Text fontSize={wp(3.5)}>{bonsai.size}</Text>
                </Box>
              </Box>
              <Box width={wp(25)}>
                <Box marginBottom="s">
                  <Text fontSize={wp(3.2)}>Form:</Text>
                  <Text fontSize={wp(3.5)}>{bonsai.form}</Text>
                </Box>
                <Box>
                  <Text fontSize={wp(3.2)}>Alter:</Text>
                  <Text fontSize={wp(3.5)}>
                    {moment(bonsai.acquisitionDate).format("D MMM. YY")}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Pressable>
      </Box>
    </Box>
  );
};
export default Feed;
