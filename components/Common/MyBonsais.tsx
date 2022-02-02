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
import AddWorksModal from "../BonsaiView/Arbeiten/AddWorks/AddWorksModal";
import { Bubble, Drop } from "iconsax-react-native";

export type MyBonsaisProps = {
  bonsaiData: any;
  navigation: any;
  user: any;
};

const MyBonsais: FC<MyBonsaisProps> = ({ bonsaiData, navigation, user }) => {
  const theme = useTheme<Theme>();
  const userData = userStore();

  const bonsaiTasksWatering = bonsaiData.tasks.filter(
    (task: any) => task.doneTask.includes("Bewässerung") && task.doneTask
  );
  const sortWateringTasks = bonsaiTasksWatering.sort(
    (a: any, b: any) =>
      new moment(a.taskDate).format("YYYYMMDD") -
      new moment(b.taskDate).format("YYYYMMDD")
  );
  const lastWatering = sortWateringTasks[sortWateringTasks.length - 1];

  const bonsaiTasksFertilize = bonsaiData.tasks.filter(
    (task: any) => task.doneTask.includes("Dünger") && task.doneTask
  );
  const sortFertilizeTasks = bonsaiTasksFertilize.sort(
    (a: any, b: any) =>
      new moment(a.taskDate).format("YYYYMMDD") -
      new moment(b.taskDate).format("YYYYMMDD")
  );
  const lastFertilize = sortFertilizeTasks[sortFertilizeTasks.length - 1];

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
                  <Text fontSize={wp(2.5)}>Art:</Text>
                  <Text fontSize={wp(3)}>
                    {bonsaiData.type ? bonsaiData.type : "keine Art eingegeben"}
                  </Text>
                </Box>
                <Box marginBottom="s">
                  <Text fontSize={wp(2.5)}>Form:</Text>
                  <Text fontSize={wp(3)}>
                    {bonsaiData.form ? bonsaiData.form : "noch keine Form"}
                  </Text>
                </Box>
              </Box>
              <Box marginRight="xs">
                <Box
                  marginBottom="s"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Text fontSize={wp(2.4)}>Alter: </Text>
                  <Text fontSize={wp(2.7)}>
                    {moment(bonsaiData.acquisitionDate).fromNow(true)}
                  </Text>
                </Box>
                <Box
                  marginBottom="s"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Box
                    justifyContent="center"
                    alignItems="center"
                    width={wp(5)}
                    height={wp(5)}
                    borderRadius="xxl"
                    backgroundColor="watering"
                  >
                    <Drop
                      size={wp(3.6)}
                      color={theme.colors.textOnDark}
                      variant="Broken"
                    />
                  </Box>
                  <Text fontSize={wp(2.7)} marginLeft="s">
                    {lastWatering
                      ? moment(lastWatering.taskDate).fromNow(true)
                      : "~"}
                  </Text>
                </Box>
                <Box
                  marginBottom="s"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Box
                    justifyContent="center"
                    alignItems="center"
                    width={wp(5)}
                    height={wp(5)}
                    borderRadius="xxl"
                    backgroundColor="fertilizer"
                  >
                    <Bubble
                      size={wp(3.6)}
                      color={theme.colors.textOnDark}
                      variant="Broken"
                    />
                  </Box>
                  <Text fontSize={wp(2.7)} marginLeft="s">
                    {lastFertilize
                      ? moment(lastFertilize.taskDate).fromNow(true)
                      : "~"}
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
