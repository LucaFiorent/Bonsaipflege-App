import React, { useEffect } from "react";
import db from "./firebase/firebaseConfig";
import firebase from "firebase";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
//theme
import { ThemeProvider } from "@shopify/restyle";
import theme from "./theme/theme";
//components
//react navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//expo
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Image, StatusBar } from "react-native";
//components
import LoginScreen from "./components/Auth/LoginScreen";
import SignUp from "./components/Auth/SignUp";
//types
// stores
import { authStore } from "./dataStores/userManagmentStore";
import { userStore } from "./dataStores/accountStore";

import HomeSection from "./sections/HomeSection";
import MySection from "./sections/MySection";
import { Home2, Profile2User } from "iconsax-react-native";

import CommunitySection from "./sections/CommunitySection";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import "moment/locale/de";
import Text from "./components/Common/Text";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

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
        <BottomSheetModalProvider>
          <NavigationContainer>
            {user ? (
              <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                  tabBarShowIcon: true,
                  tabBarIcon: ({ color }) => {
                    if (route.name === "Home") {
                      return (
                        <Home2 size={wp(5.5)} color={color} variant="Broken" />
                      );
                    } else if (route.name === "Community") {
                      return (
                        <Profile2User
                          size={wp(5.5)}
                          color={color}
                          variant="Outline"
                        />
                      );
                    } else if (route.name === "Mein Profil") {
                      return (
                        <Image
                          source={
                            userData.avatar
                              ? { uri: userData.avatar }
                              : require("./assets/images/programmer.png")
                          }
                          style={{
                            width: wp(5.5),
                            height: wp(5.5),
                            borderRadius: theme.borderRadii.xxl,
                          }}
                        />
                      );
                    }
                  },

                  tabBarActiveTintColor: theme.palette.black,
                  tabBarInactiveTintColor: theme.palette.greenPrimary,
                  tabBarLabel: ({ focused }) => {
                    if (route.name === "Home") {
                      return (
                        <Text
                          fontSize={wp(2.3)}
                          color="primaryGreenColor"
                          style={
                            focused && {
                              fontWeight: "bold",
                              color: theme.palette.black,
                            }
                          }
                        >
                          Home
                        </Text>
                      );
                    } else if (route.name === "Community") {
                      return (
                        <Text
                          fontSize={wp(2.3)}
                          color="primaryGreenColor"
                          style={
                            focused && {
                              fontWeight: "bold",
                              color: theme.palette.black,
                            }
                          }
                        >
                          Community
                        </Text>
                      );
                    } else if (route.name === "Mein Profil") {
                      return (
                        <Text
                          fontSize={wp(2.3)}
                          color="primaryGreenColor"
                          style={
                            focused && {
                              fontWeight: "bold",
                              color: theme.palette.black,
                            }
                          }
                        >
                          Mein Profil
                        </Text>
                      );
                    }
                  },
                  tabBarStyle: {
                    height: hp(7.5),
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
                  component={CommunitySection}
                  options={{ headerShown: false }}
                />
                <Tab.Screen
                  name="Mein Profil"
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
