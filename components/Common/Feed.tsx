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

export type FeedProps = {
  navigation?: any;
  bonsai: any;
  userOfBonsai?: any;
  route?: any;
};

const Feed: FC<FeedProps> = ({ navigation, route, bonsai, userOfBonsai }) => {
  const userData = userStore();
  const theme = useTheme<Theme>();
  return (
    <Box>
      <Box position="absolute" zIndex={3}>
        <Pressable
          onPress={() =>
            navigation.navigate("BonsaiView", {
              bonsai: bonsai,
              user: userOfBonsai,
              pagePath: "community",
            })
          }
        >
          <Box
            backgroundColor="mainBackground"
            alignSelf="flex-start"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            borderTopEndRadius="xxl"
            borderTopStartRadius="xxl"
            borderBottomEndRadius="xxl"
            paddingRight="xs"
            paddingLeft="s"
            style={{ marginTop: wp(2), marginLeft: wp(7.55) }}
          >
            <Text fontSize={wp(3)} color="textHighContrast" variant="title">
              {bonsai.name.length > 15
                ? bonsai.name.slice(0, 15) + ".."
                : bonsai.name}
            </Text>
          </Box>
        </Pressable>
      </Box>
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
                ? navigation.navigate("MyScreen")
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
                    zIndex: 1,
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
            navigation.navigate("BonsaiView", {
              bonsai: bonsai,
              user: userOfBonsai,
              pagePath: "community",
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
                  <Text fontSize={wp(3)}>Art:</Text>
                  <Text fontSize={wp(3.2)}>{bonsai.type}</Text>
                </Box>
                <Box>
                  <Text fontSize={wp(3)}>Größe:</Text>
                  <Text fontSize={wp(3.2)}>{bonsai.size}</Text>
                </Box>
              </Box>
              <Box width={wp(25)}>
                <Box marginBottom="s">
                  <Text fontSize={wp(3)}>Form:</Text>
                  <Text fontSize={wp(3.2)}>{bonsai.form}</Text>
                </Box>
                <Box>
                  <Text fontSize={wp(3)}>Alter:</Text>
                  <Text fontSize={wp(3.2)}>
                    {moment(bonsai.acquisitionDate).fromNow(true)}
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
