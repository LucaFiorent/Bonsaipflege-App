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

type AbonnementsProps = {
  navigation?: any;
  route?: any;
};

const Abonnements: FC<AbonnementsProps> = ({ navigation, route }) => {
  // get data from store
  const userData = userStore();
  const { communityProfiles } = communityDataStore();

  // prepare data
  let selcUsers = communityProfiles.filter((userSub) => {
    return userData.subscribed.includes(userSub.id) && userSub;
  });

  return (
    <>
      <Box>
        <Box>
          <Pressable onPress={() => navigation.navigate("AbonnementsView")}>
            <Text marginBottom="s" variant="h1">
              Deine Abonnements
            </Text>
          </Pressable>
        </Box>
        <Box
          position="relative"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="mainBackground"
          padding="xs"
          borderRadius="xxl"
          borderColor="primarySalmonColor"
          borderWidth={1}
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
                    onPress={() => navigation.navigate("AbonnementsView")}
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
          <Box position="absolute" right={0}>
            <Pressable onPress={() => navigation.navigate("AbonnementsView")}>
              <Box
                borderRadius="xxl"
                flexDirection="row"
                alignItems="center"
                paddingLeft="ms"
              >
                <Box>
                  <Text marginRight="s" fontSize={wp(2.8)}>
                    Zu den Bonsais
                  </Text>
                </Box>
                <Box
                  backgroundColor="primarySalmonColor"
                  width={wp(15.4)}
                  height={wp(15.4)}
                  borderRadius="xxl"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ArrowCircleRight
                    size={wp(8)}
                    color={theme.colors.textOnDark}
                    variant="Broken"
                  />
                </Box>
              </Box>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Abonnements;
