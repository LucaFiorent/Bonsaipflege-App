import { backgroundColor } from "@shopify/restyle";
import * as React from "react";
import { FC } from "react";
import { SafeAreaView, Image, ScrollView } from "react-native";
import Box from "../components/Common/Box";
import Text from "../components/Common/Text";
import Search from "../components/Common/Search";
import { userStore } from "../dataStores/userManagmentStore";
import theme from "../theme/theme";

const HomeScreen: FC = () => {
  const userData = userStore();

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.mainBackground }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 64 }}>
        <Box
          flex={1}
          flexDirection="row"
          alignItems="center"
          marginVertical="l"
          marginHorizontal="m"
        >
          <Box alignItems="center">
            <Box alignItems="center">
              <Image
                source={
                  userData.avatar === ""
                    ? require("../assets/images/programmer.png")
                    : { uri: userData.avatar }
                }
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: theme.borderRadii.xxl,
                }}
              />
            </Box>
          </Box>
          <Box marginLeft="xl">
            <Text fontSize={18} marginVertical="xs" textTransform="uppercase">
              {userData.nickname}
            </Text>
          </Box>
        </Box>
        <Search searchValue="" searchTrick={() => null} placeholder="lol" />
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
