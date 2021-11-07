import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React, { FC } from "react";
import { RouteProp } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../theme/theme";
import { userData } from "../dataStores/accountStore";
import MyScreen from "../screens/MyScreen";
import AddBonsai from "../components/MyScreen/AddBonsai/AddBonsai";
import AddBonsaiStep2 from "../components/MyScreen/AddBonsai/AddBonsaiStep2";

type MainStackParams = {
  MyScreen: { userData: userData };
  AddBonsai: undefined;
  AddBonsaiStep2: undefined;
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

type AddBonsaiRouteProp = RouteProp<MainStackParams, "AddBonsai">;
type AddBonsaiNavigationProp = StackNavigationProp<
  MainStackParams,
  "AddBonsai"
>;
export type AddBonsaiProps = {
  route: AddBonsaiRouteProp;
  navigation: AddBonsaiNavigationProp;
};

type AddBonsaiStep2RouteProp = RouteProp<MainStackParams, "AddBonsai">;
type AddBonsaiStep2NavigationProp = StackNavigationProp<
  MainStackParams,
  "AddBonsaiStep2"
>;
export type AddBonsaiStep2Props = {
  route: AddBonsaiStep2RouteProp;
  navigation: AddBonsaiStep2NavigationProp;
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
      <MainStack.Screen
        name="AddBonsai"
        component={AddBonsai}
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: "Add new Bonsai",
        }}
      />
      <MainStack.Screen
        name="AddBonsaiStep2"
        component={AddBonsaiStep2}
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: "Add new Bonsai",
        }}
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
