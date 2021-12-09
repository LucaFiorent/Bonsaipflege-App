import { useTheme } from "@shopify/restyle";
import * as React from "react";
import { Image, Pressable } from "react-native";
import { Theme } from "../../../theme/theme";

//components
import Box from "../../Common/Box";
import Text from "../../Common/Text";

//stores
import "react-native-gesture-handler";
import { FC } from "react";
import moment from "moment";
import { userStore } from "../../../dataStores/accountStore";

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
      <Box marginBottom="xl">
        <Box flexDirection="row" alignItems="center">
          <Box alignItems="center">
            <Image
              source={{ uri: bonsaiData.image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: theme.borderRadii.xxl,
              }}
            />
          </Box>

          <Box flex={1}>
            {user.id === userData.id && bonsaiData.publicBonsai && (
              <Box
                alignSelf="flex-end"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                borderRadius="xxl"
                borderWidth={1}
                borderColor="greyBackground"
                paddingRight="xs"
                paddingLeft="s"
              >
                <Box marginRight="s">
                  <Text fontSize={12}>öffentlich</Text>
                </Box>
                <Box
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="xxl"
                  borderWidth={1}
                  borderColor="primarySalmonColor"
                >
                  <Box
                    width={10}
                    height={10}
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
            >
              <Box>
                <Box marginVertical="xs">
                  <Text fontSize={14}>Typ:</Text>
                  <Text fontSize={16}>{bonsaiData.type}</Text>
                </Box>
                <Box marginVertical="xs">
                  <Text fontSize={14}>Form:</Text>
                  <Text fontSize={16}>{bonsaiData.form}</Text>
                </Box>
              </Box>
              <Box>
                <Box
                  marginVertical="xs"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Text fontSize={12}>Alter: </Text>
                  <Text fontSize={16}>
                    {moment(bonsaiData.acquisitionDate).format("D MMM. YY")}
                  </Text>
                </Box>
                <Box
                  marginVertical="xs"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Text fontSize={12}>Bewässerung: </Text>
                  <Text fontSize={16}>
                    {bonsaiDTasksWatering ? bonsaiDTasksWatering : "~"}
                  </Text>
                </Box>
                <Box
                  marginVertical="xs"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Text fontSize={12}>Düngung: </Text>
                  <Text fontSize={16}>
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
