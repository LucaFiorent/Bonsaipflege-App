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
import {
  Flash,
  FlashSlash,
  Logout,
  ProfileAdd,
  UserTick,
} from "iconsax-react-native";
import { communityDataStore } from "../../../dataStores/communityStore";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

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

  const followUserHandler = async (selUser: any) => {
    try {
      if (
        !userData.subscribed.includes(selUser.id) &&
        !selCommunityUser.subscribers.includes(userData.id)
      ) {
        communityDataStore.setState((state) => {
          state.communityProfiles.map((user) => {
            if (user.id === selUser.id) {
              user.subscribers.push(userData.id);
            }
          });
        });

        // Update selected user in Firestore
        const selUserFromDB = doc(db, "userData", selUser.id);
        await setDoc(selUserFromDB, {
          ...selCommunityUser,
          subscribers: [...selCommunityUser.subscribers],
        });

        userStore.setState((state) => {
          state.subscribed.push(selUser.id);
        });

        // Update current user in Firestore
        const userFromDB = doc(db, "userData", userData.id);
        await setDoc(userFromDB, {
          ...userData,
          subscribed: [...userData.subscribed],
        });
      } else {
        const subscribersOfSelUser = selCommunityUser.subscribers.filter(
          (subs) => subs !== userData.id
        );
        communityDataStore.setState((state) => {
          state.communityProfiles.map((user) => {
            if (user.id === selUser.id) {
              user.subscribers = subscribersOfSelUser;
            }
          });
        });

        // Remove subscription from Firestore
        const selUserFromDB = doc(db, "userData", selUser.id);
        await setDoc(selUserFromDB, {
          ...selCommunityUser,
          subscribers: selCommunityUser.subscribers,
        });

        const followedUsersList = userData.subscribed.filter(
          (followedUser) => followedUser !== selUser.id
        );
        userStore.setState((state) => {
          state.subscribed = followedUsersList;
        });

        // Update current user in Firestore
        const userFromDB = doc(db, "userData", userData.id);
        await setDoc(userFromDB, {
          ...userData,
          subscribed: userData.subscribed,
        });
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
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
          <Pressable onPress={() => loggingOut()}>
            <Box justifyContent="center" alignItems="center" width={wp(12)}>
              <Logout size={wp(7)} color={theme.colors.iconInactive} />
              <Text fontSize={wp(2)} color="iconInactive">
                Logout
              </Text>
            </Box>
          </Pressable>
          <Pressable onPress={() => setLightOn(!lightOn)}>
            <Box alignItems="center" width={wp(12)}>
              <Box>
                {lightOn ? (
                  <Flash size={wp(7)} color={theme.colors.primarySalmonColor} />
                ) : (
                  <FlashSlash size={wp(7)} color={theme.colors.iconInactive} />
                )}
              </Box>
              <Text fontSize={wp(2)} color="iconInactive">
                {!lightOn ? "Dark Mode" : "Light Mode"}
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
                  color={theme.colors.primarySalmonColor}
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
