import { useTheme } from "@shopify/restyle";
import * as React from "react";
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { loggingOut } from "../../../firebase/firebase";
import { Theme } from "../../../theme/theme";

//components
import Box from "../../Common/Box";
import Text from "../../Common/Text";

//stores
import { userStore } from "../../../dataStores/accountStore";
import { SimpleLineIcons } from "@expo/vector-icons";

import "react-native-gesture-handler";
import { FC, useState } from "react";

const ProfileInfos: FC = () => {
  const theme = useTheme<Theme>();
  const userData = userStore();
  const [lightOn, setLightOn] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ paddingBottom: 64 }}>
        <Box flex={1} justifyContent="space-around" marginHorizontal="m">
          <Box
            flex={1}
            flexDirection="row"
            justifyContent="space-between"
            bottom={-40}
          >
            <Pressable onPress={() => loggingOut()}>
              <Box>
                <SimpleLineIcons name={"logout"} size={24} />
              </Box>
            </Pressable>

            <Pressable onPress={() => setLightOn(!lightOn)}>
              <Box
                borderColor={!lightOn ? "greyBackground" : "error"}
                borderWidth={6}
                borderRadius="xl"
                borderStyle="dotted"
                borderTopColor={!lightOn ? "greyBackground" : "error"}
                borderBottomColor={!lightOn ? "greyBackground" : "error"}
              >
                <SimpleLineIcons
                  name={"energy"}
                  color={!lightOn ? theme.colors.iconColor : theme.colors.error}
                  size={24}
                />
              </Box>
            </Pressable>
          </Box>
          <Box flex={1} alignItems="center">
            <Box alignItems="center">
              <Image
                source={
                  userData.avatar === ""
                    ? require("../../../assets/images/programmer.png")
                    : { uri: userData.avatar }
                }
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: theme.borderRadii.xxl,
                }}
              />
            </Box>
          </Box>
          <Box alignItems="center">
            <Text fontSize={18} marginVertical="m" textTransform="uppercase">
              {userData.nickname}
            </Text>
          </Box>
          <Box
            flex={1}
            flexDirection="row"
            justifyContent="space-around"
            marginVertical="m"
          >
            <Box alignItems="center">
              <Text color="primaryGreenColor">Bäume</Text>
              <Text color="primaryGreenColor">{userData.bonsais.length}</Text>
            </Box>
            <Box alignItems="center">
              <Text color="primaryGreenColor">Abonniert</Text>
              <Text color="primaryGreenColor">
                {userData.subscribed.length}
              </Text>
            </Box>
            <Box alignItems="center">
              <Text color="primaryGreenColor">Abonnenten</Text>
              <Text color="primaryGreenColor">
                {userData.subscribers.length}
              </Text>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileInfos;
