import { backgroundColor } from "@shopify/restyle";
import * as React from "react";
import { FC } from "react";
import { SafeAreaView, Image, ScrollView } from "react-native";
import Box from "../components/Common/Box";
import Text from "../components/Common/Text";
import Search from "../components/Common/Search";
import { userStore } from "../dataStores/userManagmentStore";
import theme from "../theme/theme";
import ProfileInfos from "../components/Home/Profile/ProfileInfos";

const MyScreen: FC = () => {
  const userData = userStore();

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.mainBackground }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 64 }}>
        <ProfileInfos />
      </ScrollView>
    </SafeAreaView>
  );
};
export default MyScreen;
