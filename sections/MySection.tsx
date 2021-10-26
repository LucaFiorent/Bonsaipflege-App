import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React, { FC } from "react";
import { RouteProp } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../theme/theme";
import { userData, userStore } from "../dataStores/userManagmentStore";
import MyScreen from "../screens/MyScreen";

type MainStackParams = {
  MyScreen: { userData: userData };
};
type RootStackParams = {
  ProfileStack: undefined;
};

// navigation and route props type
type MyScreenRouteProp = RouteProp<RootStackParams, "ProfileStack">;
type MyScreenNavigationProp = StackNavigationProp<MainStackParams, "MyScreen">;
export type MyScreenProps = {
  route: MyScreenRouteProp;
  navigation: MyScreenNavigationProp;
};

const ProfileStack: FC = () => {
  const MainStack = createStackNavigator<MainStackParams>();
  const theme = useTheme<Theme>();

  return (
    <MainStack.Navigator
      screenOptions={{
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
        name="MyScreen"
        component={MyScreen}
        options={{ headerBackTitleVisible: false, headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

const MySection: FC = () => {
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
        name="ProfileStack"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default MySection;
