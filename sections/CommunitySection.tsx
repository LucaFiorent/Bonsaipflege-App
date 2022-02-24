import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React, { FC } from "react";
import { RouteProp } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../theme/theme";
import CommunityUserProfileView from "../components/Community/CommunityUserProfileView";
import CommunityScreen from "../screens/CommunityScreen";
import BonsaiView from "../components/BonsaiView/BonsaiView";
import AbonnementsView from "../components/Community/Abonnements/AbonnementsView";
import { ArrowCircleLeft2 } from "iconsax-react-native";
import MyScreen from "../screens/MyScreen";

type RootStackParams = {
  CommunityStack: undefined;
};

// navigation and route props type of CommunityStack
type MainStackCommunityParams = {
  Community: undefined;
  CommunityUserProfileView: { navigation: any; userOfBonsai: any };
  BonsaiView: { bonsai: any; user: any; pagePath: string };
  AbonnementsView: { navigation: any; route: any };
};

type CommunityScreenRouteProp = RouteProp<RootStackParams, "CommunityStack">;
type CommunityNavigationProp = StackNavigationProp<
  MainStackCommunityParams,
  "Community"
>;

export type CommunityScreenProps = {
  route: CommunityScreenRouteProp;
  navigation: CommunityNavigationProp;
};

type CommunityUserProfileViewRouteProp = RouteProp<
  MainStackCommunityParams,
  "CommunityUserProfileView"
>;
type CommunityUserProfileViewNavigationProp = StackNavigationProp<
  MainStackCommunityParams,
  "CommunityUserProfileView"
>;

export type CommunityUserProfileViewProps = {
  route: CommunityUserProfileViewRouteProp;
  navigation: CommunityUserProfileViewNavigationProp;
};

type BonsaiViewRouteProp = RouteProp<MainStackCommunityParams, "BonsaiView">;
type BonsaiViewNavigationProp = StackNavigationProp<
  MainStackCommunityParams,
  "BonsaiView"
>;

export type BonsaiViewProps = {
  route: BonsaiViewRouteProp;
  navigation: BonsaiViewNavigationProp;
};

type AbonnementsViewRouteProp = RouteProp<
  MainStackCommunityParams,
  "AbonnementsView"
>;
type AbonnementsViewNavigationProp = StackNavigationProp<
  MainStackCommunityParams,
  "AbonnementsView"
>;

export type AbonnementsViewProps = {
  route: AbonnementsViewRouteProp;
  navigation: AbonnementsViewNavigationProp;
};

const CommunityStack: FC = () => {
  const MainStack = createStackNavigator<MainStackCommunityParams>();
  const theme = useTheme<Theme>();

  return (
    <MainStack.Navigator
      screenOptions={{
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
        name="Community"
        component={CommunityScreen}
        options={{ headerBackTitleVisible: false, headerShown: false }}
      />
      <MainStack.Screen
        name="CommunityUserProfileView"
        component={CommunityUserProfileView}
        options={{ headerBackTitleVisible: false, headerShown: true }}
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
        name="AbonnementsView"
        component={AbonnementsView}
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
        }}
      />
    </MainStack.Navigator>
  );
};

const CommunitySection: FC = () => {
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
        name="CommunityStack"
        component={CommunityStack}
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default CommunitySection;
