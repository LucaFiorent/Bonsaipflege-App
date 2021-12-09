import { useTheme } from "@shopify/restyle";
import * as React from "react";
import { Image, Pressable } from "react-native";
import { loggingOut } from "../../../firebase/firebase";
import { Theme } from "../../../theme/theme";

//components
import Box from "../../Common/Box";
import Text from "../../Common/Text";

//stores
import { userStore } from "../../../dataStores/accountStore";
import { SimpleLineIcons } from "@expo/vector-icons";

import "react-native-gesture-handler";
import { FC, useEffect, useState } from "react";
import {
  Flash,
  FlashSlash,
  Logout,
  ProfileAdd,
  UserTick,
} from "iconsax-react-native";
import db from "../../../firebase/firebaseConfig";
import { communityDataStore } from "../../../dataStores/communityStore";
import { NavigationContainer } from "@react-navigation/native";

export type ProfileInfosProps = {
  navigation?: any;
  user: any;
  bonsais: number;
};

const ProfileInfos: FC<ProfileInfosProps> = ({ navigation, user, bonsais }) => {
  const userData = userStore();
  const theme = useTheme<Theme>();
  const [lightOn, setLightOn] = useState(false);

  const { communityProfiles } = communityDataStore();

  const selCommunityUserRaw = communityProfiles.filter(
    (selectedUser) => selectedUser.id === user.id
  );

  const selCommunityUser = selCommunityUserRaw[0];
  const followUserHandler = (selUser: any) => {
    if (
      !userData.subscribed.includes(selUser.id) &&
      !selCommunityUser.subscribers.includes(userData.id)
    ) {
      communityDataStore.setState((state) => {
        state.communityProfiles.map((user) => {
          user.id === selUser.id && user.subscribers.push(userData.id);
        });
      });
      const selUserFromDB = db.collection("userData").doc(selUser.id);
      selUserFromDB.set({
        ...selCommunityUser,
        subscribers: [...selCommunityUser.subscribers],
      });

      userStore.setState((state) => {
        state.subscribed.push(selUser.id);
      });
      const userFromDB = db.collection("userData").doc(userData.id);
      userFromDB.set({
        ...userData,
        subscribed: [...userData.subscribed],
      });
    } else {
      const subscribersOfSelUser = selCommunityUser.subscribers.filter(
        (subs) => subs != userData.id
      );
      communityDataStore.setState((state) => {
        state.communityProfiles.map((user) => {
          user.id === selUser.id && (user.subscribers = subscribersOfSelUser);
        });
      });
      const selUserFromDB = db.collection("userData").doc(selUser.id);
      selUserFromDB.set({
        ...selCommunityUser,
        subscribed: selCommunityUser.subscribed,
      });
      const followedUsersList = userData.subscribed.filter(
        (followedUser) => followedUser != selUser.id
      );
      userStore.setState((state) => {
        state.subscribed = followedUsersList;
      });
      const userFromDB = db.collection("userData").doc(userData.id);
      userFromDB.set({ ...userData, subscribed: userData.subscribed });
    }
  };
  const selUser = user.id === userData.id ? user : selCommunityUser;

  return (
    <Box marginBottom="l">
      {user.id === userData.id ? (
        <Box bottom={-40} flexDirection="row" justifyContent="space-between">
          <Pressable onPress={() => loggingOut()}>
            <Box justifyContent="center" alignItems="center" width={60}>
              <Logout size={34} color={theme.colors.iconInactive} />
              <Text fontSize={10} color="iconInactive">
                Logout
              </Text>
            </Box>
          </Pressable>
          <Pressable onPress={() => setLightOn(!lightOn)}>
            <Box alignItems="center" width={60}>
              <Box
                borderColor={!lightOn ? "greyBackground" : "primarySalmonColor"}
                borderWidth={2}
                borderRadius="xl"
              >
                {lightOn ? (
                  <Flash size={30} color={theme.colors.primarySalmonColor} />
                ) : (
                  <FlashSlash size={30} color={theme.colors.iconInactive} />
                )}
              </Box>
              <Text fontSize={10} color="iconInactive">
                {!lightOn ? "Dark Mode" : "Light Mode"}
              </Text>
            </Box>
          </Pressable>
        </Box>
      ) : (
        <Box alignSelf="flex-end" bottom={-40} width={60}>
          <Pressable onPress={() => followUserHandler(user)}>
            {!selCommunityUser.subscribers.includes(userData.id) ? (
              <Box alignItems="center">
                <ProfileAdd
                  size={34}
                  color={theme.colors.primarySalmonColor}
                  variant="Broken"
                />
                <Text fontSize={10}>Folgen</Text>
              </Box>
            ) : (
              <Box alignItems="center">
                <UserTick
                  size={34}
                  color={theme.colors.primarySalmonColor}
                  variant="Broken"
                />
                <Text fontSize={10}>Nicht Folgen</Text>
              </Box>
            )}
          </Pressable>
        </Box>
      )}

      <Box alignItems="center">
        <Pressable onPress={() => navigation.navigate("EditProfile")}>
          <Box alignItems="center">
            <Image
              source={
                user.avatar === ""
                  ? require("../../../assets/images/programmer.png")
                  : { uri: selUser.avatar }
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: theme.borderRadii.xxl,
              }}
            />
          </Box>
          <Box alignItems="center">
            <Text marginVertical="m" variant="title" color="textHighContrast">
              {user.nickname}
            </Text>
          </Box>
        </Pressable>
      </Box>
      <Box flexDirection="row" justifyContent="space-around" marginVertical="m">
        <Box alignItems="center">
          <Text color="primaryGreenColor">Bäume</Text>
          <Text color="primaryGreenColor">{bonsais}</Text>
        </Box>
        <Box alignItems="center">
          <Text color="primaryGreenColor">Abonniert</Text>
          <Text color="primaryGreenColor">{selUser.subscribed.length}</Text>
        </Box>
        <Box alignItems="center">
          <Text color="primaryGreenColor">Abonnenten</Text>
          <Text color="primaryGreenColor">{selUser.subscribers.length}</Text>
        </Box>
      </Box>
    </Box>
  );
};
export default ProfileInfos;
