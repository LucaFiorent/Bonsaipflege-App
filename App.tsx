import React, { useEffect, useState } from "react";
import db, { firebaseConfig } from "./firebase/firebaseConfig";
import firebase from "firebase";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

//theme
import { ThemeProvider } from "@shopify/restyle";
import theme from "./theme/theme";
//components
import CommunityScreen from "./screens/CommunityScreen";
//import MySectionScreen from "./screens/MySectionScreen";
//react navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//expo
import { SimpleLineIcons } from "@expo/vector-icons";
import Box from "./components/Common/Box";
import Text from "./components/Common/Text";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Button, Image, StatusBar } from "react-native";
//components
import LoginScreen from "./components/Auth/LoginScreen";
import SignUp from "./components/Auth/SignUp";
//types
// stores
import { authStore } from "./dataStores/userManagmentStore";
import { userBonsaisStore, userStore } from "./dataStores/accountStore";

import HomeSection from "./sections/HomeSection";
import MySection from "./sections/MySection";

export default function App() {
  const appTheme = theme;
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const { user } = authStore();
  const userData = userStore();

  let [fontsLoaded] = useFonts({
    "HinaMincho-Regular": require("./assets/fonts/HinaMincho-Regular.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "Ubuntu-Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
  });

  useEffect(() => {
    // if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        authStore.setState({ user: user });
      } else authStore.setState({ user: null });
    });
  }, []);

  const getUserData = () => {
    if (user) {
      const data = db.collection("userData").doc(user.uid);
      data.get().then((doc: any) => {
        userStore.setState(() => ({ ...doc.data(), id: user.uid }));
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, [user]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={appTheme}>
        <StatusBar
          animated={true}
          backgroundColor={theme.colors.primaryGreenColor}
        />

        <Box alignItems="center" backgroundColor="primaryGreenColor">
          <Text
            marginVertical="m"
            fontSize={20}
            fontFamily="HinaMincho-Regular"
          >
            BONSAI
          </Text>
        </Box>
        <BottomSheetModalProvider>
          <NavigationContainer>
            {user ? (
              <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                      iconName = "home";
                    } else if (route.name === "Community") {
                      iconName = "people";
                    } else if (route.name === "Me") {
                      iconName = "user";
                    }
                    return (
                      <SimpleLineIcons
                        name={iconName}
                        size={22}
                        color={color}
                      />
                    );
                  },
                  tabBarActiveTintColor: theme.colors.text,
                  tabBarInactiveTintColor: theme.palette.greenDark,
                  tabBarStyle: {
                    height: 60,
                    paddingTop: theme.spacing.s,
                    paddingBottom: theme.spacing.s,
                    backgroundColor: theme.colors.primaryBGColor,
                  },
                })}
              >
                <Tab.Screen
                  name="Home"
                  component={HomeSection}
                  options={{ headerShown: false }}
                />
                <Tab.Screen
                  name="Community"
                  component={CommunityScreen}
                  options={{ headerShown: false }}
                />
                <Tab.Screen
                  name="Me"
                  component={MySection}
                  options={{ headerShown: false }}
                />
              </Tab.Navigator>
            ) : (
              <Stack.Navigator>
                <Stack.Screen
                  name="login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="signup"
                  component={SignUp}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </BottomSheetModalProvider>
      </ThemeProvider>
    );
  }
}
