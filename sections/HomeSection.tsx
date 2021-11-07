import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React, { FC } from "react";
import { RouteProp } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../theme/theme";
import HomeScreen from "../screens/HomeScreen";

type MainStackParams = {
  HomeScreen: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  MainStackParams,
  "HomeScreen"
>;

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

type RootStackParams = {
  HomeStack: undefined;
};

type HomeStackRouteProp = RouteProp<RootStackParams, "HomeStack">;

export type HomeStackProps = {
  route: HomeStackRouteProp;
};

const HomeStack: FC = () => {
  const MainStack = createStackNavigator<MainStackParams>();
  const theme = useTheme<Theme>();
  return (
    <MainStack.Navigator
      screenOptions={{
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        headerBackImage: () => (
          <SimpleLineIcons
            name="arrow-left-circle"
            size={24}
            color={theme.colors.primaryGreenColor}
          />
        ),
      }}
    >
      <MainStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

const HomeSection: FC = () => {
  const RootStack = createStackNavigator<RootStackParams>();
  const theme = useTheme<Theme>();
  return (
    <RootStack.Navigator
      screenOptions={{
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        headerBackImage: () => (
          <SimpleLineIcons
            name="arrow-left-circle"
            size={24}
            color={theme.colors.primaryGreenColor}
          />
        ),
      }}
    >
      <RootStack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default HomeSection;
