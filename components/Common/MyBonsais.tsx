import { useTheme } from "@shopify/restyle";
import * as React from "react";
import { Image, Pressable } from "react-native";
import { Theme } from "../../theme/theme";

//components
import Box from "./Box";
import Text from "./Text";

//stores
import "react-native-gesture-handler";
import { FC } from "react";
import moment from "moment";
import { userStore } from "../../dataStores/accountStore";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export type MyBonsaisProps = {
  bonsaiData: any;
  navigation: any;
  user: any;
};

const MyBonsais: FC<MyBonsaisProps> = ({ bonsaiData, navigation, user }) => {
  const theme = useTheme<Theme>();
  const userData = userStore();

  const bonsaiDTasksFertilize = null;
  const bonsaiDTasksWatering = null;

  return (
    <Pressable
      onPress={() =>
        user.id === userData.id
          ? navigation.navigate("BonsaiViewStack", {
              screen: "BonsaiView",
              params: {
                bonsai: bonsaiData,
                user: user,
              },
            })
          : navigation.navigate("CommunityStack", {
              screen: "BonsaiView",
              params: {
                bonsai: bonsaiData,
                user: user,
                pagePath: "community",
              },
            })
      }
    >
      <Box
        marginBottom="xl"
        backgroundColor="mainBackground"
        borderTopEndRadius="m"
        borderBottomEndRadius="m"
        borderTopStartRadius="xxl"
        borderBottomStartRadius="xxl"
        padding="xs"
      >
        <Box flexDirection="row" alignItems="center">
          <Box alignItems="center">
            <Image
              source={{ uri: bonsaiData.image }}
              style={{
                width: wp(25),
                height: wp(25),
                borderRadius: theme.borderRadii.xxl,
              }}
            />
          </Box>

          <Box flex={1}>
            {user.id === userData.id && bonsaiData.publicBonsai && (
              <Box
                backgroundColor="mainBackground"
                alignSelf="flex-end"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                borderRadius="xxl"
                borderWidth={1}
                borderColor="greyBackground"
                paddingRight="xs"
                paddingLeft="s"
                style={{ marginTop: wp(-3.2) }}
              >
                <Box marginRight="s">
                  <Text fontSize={wp(2.3)}>öffentlich</Text>
                </Box>
                <Box
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="xxl"
                  borderWidth={1}
                  borderColor="primarySalmonColor"
                >
                  <Box
                    width={wp(2)}
                    height={wp(2)}
                    backgroundColor="primaryGreenColor"
                    borderRadius="xxl"
                    borderWidth={1}
                    borderColor="textOnDark"
                  />
                </Box>
              </Box>
            )}

            <Box
              flex={1}
              flexDirection="row"
              marginLeft="l"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Box marginBottom="s">
                  <Text fontSize={wp(3.2)}>Typ:</Text>
                  <Text fontSize={wp(3.4)}>{bonsaiData.type}</Text>
                </Box>
                <Box marginBottom="s">
                  <Text fontSize={wp(3.2)}>Form:</Text>
                  <Text fontSize={wp(3.4)}>{bonsaiData.form}</Text>
                </Box>
              </Box>
              <Box>
                <Box
                  marginBottom="s"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Text fontSize={wp(3)}>Alter: </Text>
                  <Text fontSize={wp(3.5)}>
                    {moment(bonsaiData.acquisitionDate).format("D MMM. YY")}
                  </Text>
                </Box>
                <Box
                  marginBottom="s"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Text fontSize={wp(3)}>Bewässerung: </Text>
                  <Text fontSize={wp(3.4)}>
                    {bonsaiDTasksWatering ? bonsaiDTasksWatering : "~"}
                  </Text>
                </Box>
                <Box
                  marginBottom="s"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Text fontSize={wp(3)}>Düngung: </Text>
                  <Text fontSize={wp(3.4)}>
                    {bonsaiDTasksFertilize ? bonsaiDTasksFertilize : "~"}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};
export default MyBonsais;
