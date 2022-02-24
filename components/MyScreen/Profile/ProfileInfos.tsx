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

import "react-native-gesture-handler";
import { FC, useState } from "react";
import { Logout, ProfileAdd, Setting2, UserTick } from "iconsax-react-native";
import db from "../../../firebase/firebaseConfig";
import { communityDataStore } from "../../../dataStores/communityStore";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export type ProfileInfosProps = {
  navigation?: any;
  user: any;
  bonsais: number;
};

const ProfileInfos: FC<ProfileInfosProps> = ({ navigation, user, bonsais }) => {
  const userData = userStore();
  const theme = useTheme<Theme>();

  const { communityProfiles } = communityDataStore();

  // prepare data
  const selCommunityUserRaw = communityProfiles.filter(
    (selectedUser) => selectedUser.id === user.id
  );
  const selCommunityUser = selCommunityUserRaw[0];

  // logic for the follow user handler
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
    <Box marginTop="m" marginBottom="ms">
      {user.id === userData.id ? (
        <Box
          style={{ marginBottom: wp(-9.5) }}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Pressable
            onPress={() => {
              loggingOut();
              navigation.navigate("Home");
            }}
          >
            <Box justifyContent="center" alignItems="center" width={wp(12)}>
              <Logout
                size={wp(7)}
                color={theme.colors.iconInactive}
                variant="Broken"
              />
              <Text fontSize={wp(2)} color="iconInactive">
                Logout
              </Text>
            </Box>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("EditProfile")}>
            <Box alignItems="center" width={wp(12)}>
              <Setting2 size={wp(7)} color={theme.colors.iconInactive} />
              <Text fontSize={wp(2)} color="iconInactive" textAlign="center">
                Konto
              </Text>
            </Box>
          </Pressable>
        </Box>
      ) : (
        <Box
          alignSelf="flex-end"
          style={{ marginBottom: wp(-9.5) }}
          width={wp(14)}
        >
          <Pressable onPress={() => followUserHandler(user)}>
            {!selCommunityUser.subscribers.includes(userData.id) ? (
              <Box alignItems="center">
                <ProfileAdd
                  size={wp(7)}
                  color={theme.colors.primarySalmonColor}
                  variant="Broken"
                />
                <Text fontSize={wp(2)}>Folgen</Text>
              </Box>
            ) : (
              <Box alignItems="center">
                <UserTick
                  size={wp(7)}
                  color={theme.colors.primaryGreenColor}
                  variant="Broken"
                />
                <Text fontSize={wp(2)}>Nicht Folgen</Text>
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
                width: wp(22),
                height: wp(22),
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
      <Box flexDirection="row" justifyContent="space-around" marginBottom="m">
        <Box alignItems="center" width={wp(33)}>
          <Text color="primaryGreenColor">Bäume</Text>
          <Text color="primaryGreenColor">{bonsais}</Text>
        </Box>
        <Box alignItems="center" width={wp(33)}>
          <Text color="primaryGreenColor">Abonniert</Text>
          <Text color="primaryGreenColor">{selUser.subscribed.length}</Text>
        </Box>
        <Box alignItems="center" width={wp(33)}>
          <Text color="primaryGreenColor">Abonnenten</Text>
          <Text color="primaryGreenColor">{selUser.subscribers.length}</Text>
        </Box>
      </Box>
    </Box>
  );
};
export default ProfileInfos;
