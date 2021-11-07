import { useTheme } from "@shopify/restyle";
import * as React from "react";
import { Image, Pressable, SafeAreaView, ScrollView } from "react-native";
import { Theme } from "../../../theme/theme";

//components
import Box from "../../Common/Box";
import Text from "../../Common/Text";

//stores
import { userStore } from "../../../dataStores/accountStore";
import { SimpleLineIcons } from "@expo/vector-icons";

import "react-native-gesture-handler";
import { FC, useEffect, useState } from "react";
import db from "../../../firebase/firebaseConfig";

const Feed: FC = (profile, navigation) => {
  const theme = useTheme<Theme>();
  const userData = userStore();
  const [allBonsais, setAllBonsais] = useState();

  return (
    <SafeAreaView>
      <Box marginBottom="xl">
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
        <Box flex={1} flexDirection="row" alignItems="center">
          <Box alignItems="center">
            <Image
              source={
                userData.avatar === ""
                  ? require("../../../assets/images/bonsai.jpg")
                  : { uri: userData.avatar }
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
                <Text fontSize={16}>Schwarzkiefer</Text>
              </Box>
              <Box marginVertical="xs">
                <Text fontSize={14}>Größe:</Text>
                <Text fontSize={16}>CHUMONO</Text>
              </Box>
            </Box>
            <Box>
              <Box marginVertical="xs">
                <Text fontSize={14}>Form:</Text>
                <Text fontSize={16}>SOKAN</Text>
              </Box>
              <Box marginVertical="xs">
                <Text fontSize={14}>Alter:</Text>
                <Text fontSize={16}>15 j</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};
export default Feed;
