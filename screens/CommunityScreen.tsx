import * as React from "react";
import { FC } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-navigation";
import { Theme } from "../theme/theme";

const CommunityScreen: FC = () => {
  const theme = useTheme<Theme>();

  return (
    <SafeAreaView>
      <View></View>
    </SafeAreaView>
  );
};

export default CommunityScreen;
