import * as React from "react";
import { SafeAreaView, ScrollView, Pressable } from "react-native";
import Box from "../components/Common/Box";
import theme from "../theme/theme";
import ProfileInfos from "../components/MyScreen/Profile/ProfileInfos";
import { SimpleLineIcons } from "@expo/vector-icons";
import NextStepButton from "../components/Common/NextStepButton";
import { MyScreenProps } from "../sections/MySection";
import { FC } from "react";

const MyScreen: FC<MyScreenProps> = ({ navigation }) => {
  // const userData = userStore();

  return (
    <>
      <NextStepButton
        onPress={() => {
          navigation.navigate("AddBonsai");
        }}
        primary={theme.colors.primarySalmonColor}
        title=""
        icon="plus"
      />
      <SafeAreaView style={{ backgroundColor: theme.colors.mainBackground }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 64 }}>
          <ProfileInfos />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MyScreen;
