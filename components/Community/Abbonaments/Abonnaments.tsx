import { ArrowCircleRight } from "iconsax-react-native";
import * as React from "react";
import { FC } from "react";
import { Image, Pressable } from "react-native";
import { userStore } from "../../../dataStores/accountStore";
import Box from "../../Common/Box";
import Text from "../../Common/Text";
import theme from "../../../theme/theme";
import { communityDataStore } from "../../../dataStores/communityStore";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type AbonnamentsProps = {
  navigation?: any;
  route?: any;
};

const Abonnaments: FC<AbonnamentsProps> = ({ navigation, route }) => {
  const userData = userStore();
  const { communityProfiles } = communityDataStore();

  let selcUsers = communityProfiles.filter((userSub) => {
    return userData.subscribed.includes(userSub.id) && userSub;
  });

  return (
    <>
      <Box>
        <Box>
          <Pressable onPress={() => navigation.navigate("AbonnamentsView")}>
            <Text marginBottom="s" variant="h1">
              Deine Abonnaments
            </Text>
          </Pressable>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="mainBackground"
          padding="xs"
          borderRadius="xxl"
        >
          <Box flexDirection="row" alignItems="center">
            {selcUsers.length > 0 && (
              <>
                {selcUsers.slice(0, 4).map((userSub, index) => {
                  return (
                    <Box
                      key={index}
                      style={{ marginRight: wp(-2.5) }}
                      backgroundColor="primaryGreenColor"
                      borderRadius="xxl"
                    >
                      <Image
                        key="index"
                        source={
                          userSub.avatar === ""
                            ? require("../../../assets/images/programmer.png")
                            : { uri: userSub.avatar }
                        }
                        style={{
                          width: wp(12.5),
                          height: wp(12.5),
                          borderRadius: theme.borderRadii.xxl,
                        }}
                      />
                    </Box>
                  );
                })}
                {selcUsers.length - 4 > 0 && (
                  <Pressable
                    onPress={() => navigation.navigate("AbonnamentsView")}
                  >
                    <Box>
                      <Text
                        variant="inputTitle"
                        color="textHighContrast"
                        fontSize={wp(3.5)}
                        marginLeft="m"
                      >
                        +{userData.subscribed.length - 4}
                      </Text>
                    </Box>
                  </Pressable>
                )}
              </>
            )}
          </Box>
          <Pressable onPress={() => navigation.navigate("AbonnamentsView")}>
            <Box flexDirection="row" alignItems="center">
              <Box>
                <Text marginRight="s" fontSize={wp(2.5)}>
                  zu den Bonsais
                </Text>
              </Box>
              <Box>
                <ArrowCircleRight
                  size={wp(8)}
                  color={theme.colors.primarySalmonColor}
                  variant="Broken"
                />
              </Box>
            </Box>
          </Pressable>
        </Box>
      </Box>
    </>
  );
};

export default Abonnaments;
