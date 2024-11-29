import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase/firebaseConfig";
// import firebase from "firebase";
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
// import { useFonts } from "expo-font";
import * as Font from "expo-font";
// import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
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
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const fetchFonts = () => {
  return Font.loadAsync({
    "HinaMincho-Regular": require("./assets/fonts/HinaMincho-Regular.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "Ubuntu-Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
  });
};

export default function App() {
  const appTheme = theme;
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const { user } = authStore();
  const userData = userStore();

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFontsAndUserData = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fetchFonts();
        setFontLoaded(true);

        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
          if (user) {
            // console.log("User logged in:", user);
            authStore.setState({ user });
            await getUserData(); // Fetch user data here
          } else {
            console.log("No user logged in.");
            authStore.setState({ user: null });
          }
        });

        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading
        SplashScreen.hideAsync(); // Hide splash after loading
        return () => unsubscribeAuth(); // Cleanup listener
      } catch (e) {
        console.warn("Error in loading:", e);
      }
    };

    loadFontsAndUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        authStore.setState({ user: user });
      } else {
        authStore.setState({ user: null });
      }
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const getUserData = async () => {
    if (user) {
      try {
        const docRef = doc(db, "userData", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          userStore.setState({ ...docSnap.data(), id: user.uid });
          // console.log("User data fetched:", docSnap.data());
        } else {
          console.log("No such document in Firestore for user:", user.uid);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, [user]);

  useEffect(() => {
    async function prepare() {
      // Perform any necessary loading operations here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a loading delay
      SplashScreen.hideAsync(); // Hide the splash screen after loading
    }
    prepare();
  }, []);

  if (!fontLoaded) {
    return null;
  }
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
                  } else if (route.name === "Me") {
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
                tabBarActiveTintColor: theme.colors.text,
                tabBarInactiveTintColor: theme.palette.greenDark,
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
