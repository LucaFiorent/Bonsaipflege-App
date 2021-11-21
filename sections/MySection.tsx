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
import BonsaiView from "../components/Home/Community/BonsaiView";
import UpdateBonsai from "../components/MyScreen/UpdateBonsai/UpdateBonsai";
import UpdateBonsaiStep2 from "../components/MyScreen/UpdateBonsai/UpdateBonsaiStep2";

type RootStackParams = {
  ProfileStack: undefined;
  BonsaiViewStack: undefined;
};

// navigation and route props type of ProfileStack
type MainStackProfileParams = {
  MyScreen: { userData: userData };
  AddBonsai: undefined;
  AddBonsaiStep2: undefined;
};

type MyScreenRouteProp = RouteProp<RootStackParams, "ProfileStack">;
type MyScreenNavigationProp = StackNavigationProp<
  MainStackProfileParams,
  "MyScreen"
>;

export type MyScreenProps = {
  route: MyScreenRouteProp;
  navigation: MyScreenNavigationProp;
};

type AddBonsaiRouteProp = RouteProp<MainStackProfileParams, "AddBonsai">;
type AddBonsaiNavigationProp = StackNavigationProp<
  MainStackProfileParams,
  "AddBonsai"
>;
export type AddBonsaiProps = {
  route: AddBonsaiRouteProp;
  navigation: AddBonsaiNavigationProp;
};

type AddBonsaiStep2RouteProp = RouteProp<MainStackProfileParams, "AddBonsai">;
type AddBonsaiStep2NavigationProp = StackNavigationProp<
  MainStackProfileParams,
  "AddBonsaiStep2"
>;
export type AddBonsaiStep2Props = {
  route: AddBonsaiStep2RouteProp;
  navigation: AddBonsaiStep2NavigationProp;
};

// navigation and route props type of BonsaiViewStack
type MainStackBonsaiViewParams = {
  BonsaiView: { bonsai: any; user: any };
  UpdateBonsai: undefined;
  UpdateBonsaiStep2: undefined;
};

type BonsaiViewRouteProp = RouteProp<RootStackParams, "BonsaiViewStack">;
type BonsaiViewNavigationProp = StackNavigationProp<
  MainStackBonsaiViewParams,
  "BonsaiView"
>;

export type BonsaiViewProps = {
  route: BonsaiViewRouteProp;
  navigation: BonsaiViewNavigationProp;
};

type UpdateBonsaiRouteProp = RouteProp<
  MainStackBonsaiViewParams,
  "UpdateBonsai"
>;
type UpdateBonsaiNavigationProp = StackNavigationProp<
  MainStackBonsaiViewParams,
  "UpdateBonsai"
>;
export type UpdateBonsaiProps = {
  route: UpdateBonsaiRouteProp;
  navigation: UpdateBonsaiNavigationProp;
};

type UpdateBonsaiStep2RouteProp = RouteProp<
  MainStackBonsaiViewParams,
  "UpdateBonsai"
>;
type UpdateBonsaiStep2NavigationProp = StackNavigationProp<
  MainStackBonsaiViewParams,
  "UpdateBonsaiStep2"
>;
export type UpdateBonsaiStep2Props = {
  route: UpdateBonsaiStep2RouteProp;
  navigation: UpdateBonsaiStep2NavigationProp;
};

const ProfileStack: FC = () => {
  const MainStack = createStackNavigator<MainStackProfileParams>();
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

const BonsaiViewStack: FC = () => {
  const MainStack = createStackNavigator<MainStackBonsaiViewParams>();
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
        name="BonsaiView"
        component={BonsaiView}
        options={{ headerBackTitleVisible: false, headerShown: false }}
      />
      <MainStack.Screen
        name="UpdateBonsai"
        component={UpdateBonsai}
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: "update Bonsai",
        }}
      />
      <MainStack.Screen
        name="UpdateBonsaiStep2"
        component={UpdateBonsaiStep2}
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: "update Bonsai",
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
      <RootStack.Screen
        name="BonsaiViewStack"
        component={BonsaiViewStack}
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default MySection;
