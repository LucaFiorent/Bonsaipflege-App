import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React, { FC } from "react";
import { RouteProp } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../theme/theme";
import HomeScreen from "../screens/HomeScreen";
import { ArrowCircleLeft2 } from "iconsax-react-native";
import CommunityScreen from "../screens/CommunityScreen";
import CommunityUserProfileView from "../components/Community/CommunityUserProfileView";
import BonsaiView from "../components/BonsaiView/BonsaiView";

// root stack
type RootStackParams = {
  HomeStack: undefined;
};

//main stack
type MainStackParams = {
  HomeScreen: undefined;
  BonsaiView: { bonsai: any; user: any; pagePath: string };
  CommunityUserProfileView: undefined;
};

type HomeScreenRouteProp = RouteProp<RootStackParams, "HomeStack">;
type HomeScreenNavigationProp = StackNavigationProp<
  MainStackParams,
  "HomeScreen"
>;

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

//main stack bonsai view screen
type BonsaiViewNavigationProp = StackNavigationProp<
  MainStackParams,
  "BonsaiView"
>;
type BonsaiViewRouteProp = RouteProp<MainStackParams, "BonsaiView">;

export type BonsaiViewProps = {
  navigation: BonsaiViewNavigationProp;
  route: BonsaiViewRouteProp;
};

//main stack CommunityProfile view screen
type CommunityUserProfileViewNavigationProp = StackNavigationProp<
  MainStackParams,
  "CommunityUserProfileView"
>;
type CommunityUserProfileViewRouteProp = RouteProp<
  MainStackParams,
  "CommunityUserProfileView"
>;

export type CommunityUserProfileViewProps = {
  navigation: CommunityUserProfileViewNavigationProp;
  route: CommunityUserProfileViewRouteProp;
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
          <ArrowCircleLeft2
            size={30}
            color={theme.colors.primaryGreenColor}
            variant="Broken"
          />
        ),
      }}
    >
      <MainStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="BonsaiView"
        component={BonsaiView}
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
        }}
      />
      <MainStack.Screen
        name="CommunityUserProfileView"
        component={CommunityUserProfileView}
        options={{ headerBackTitleVisible: false, headerShown: true }}
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
          <ArrowCircleLeft2
            size={30}
            color={theme.colors.primaryGreenColor}
            variant="Broken"
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
