import * as React from "react";
import { FC } from "react";
import Box from "../../Common/Box";
import Text from "../../Common/Text";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import theme from "../../../theme/theme";

import { Image, Pressable } from "react-native";
import { Bubble, Drop } from "iconsax-react-native";
import moment from "moment";
import { NavigationEvents } from "react-navigation";
import { userStore } from "../../../dataStores/accountStore";

type LastWorksProps = {
  myLatestWorks: any;
  navigation?: any;
  route?: any;
};

const LastWorks: FC<LastWorksProps> = ({
  myLatestWorks,
  navigation,
  route,
}) => {
  const userData = userStore();
  let today = new Date();
  const bonsaiTasksWatering = myLatestWorks.tasks.filter(
    (task: any) =>
      task.doneTask.includes("Bewässerung") &&
      moment(task.taskDate).format("D MMM. YY") ===
        moment(today).format("D MMM. YY")
  );

  const sortWateringTasks = bonsaiTasksWatering.sort();
  const lastWatering = sortWateringTasks[sortWateringTasks.length - 1];

  const bonsaiTasksFertilize = myLatestWorks.tasks.filter(
    (task: any) =>
      task.doneTask.includes("Dünger") &&
      moment(task.taskDate).format("D MMM. YY") ===
        moment(today).format("D MMM. YY")
  );
  const sortTasks = bonsaiTasksFertilize.sort();
  const lastFertilize = sortTasks[sortTasks.length - 1];

  return (
    <Box>
      <Pressable
        onPress={() =>
          navigation.navigate("BonsaiView", {
            bonsai: myLatestWorks,
            user: userData,
            pagePath: "home",
          })
        }
      >
        <Box
          backgroundColor="mainBackground"
          borderTopEndRadius="m"
          borderBottomEndRadius="m"
          borderTopStartRadius="xxl"
          borderBottomStartRadius="xxl"
          padding="xs"
          marginBottom="ms"
        >
          <Box flexDirection="row" alignItems="center">
            <Box alignItems="center">
              <Image
                source={{ uri: myLatestWorks.image }}
                style={{
                  width: wp(25),
                  height: wp(25),
                  borderRadius: theme.borderRadii.xxl,
                }}
              />
            </Box>

            <Box
              flex={1}
              flexDirection="row"
              marginLeft="l"
              justifyContent="space-around"
              alignItems="center"
            >
              <Box
                marginBottom="s"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Box alignItems="center">
                  <Drop
                    size="32"
                    color={theme.colors.watering}
                    variant="Broken"
                  />
                  <Text fontSize={wp(2.5)}>Bewässert vor</Text>
                </Box>
                <Text fontSize={wp(3.2)}>
                  {lastWatering
                    ? moment(lastWatering.taskDate)
                        .locale("de-de")
                        .fromNow(true)
                    : "~"}
                </Text>
              </Box>
              <Box
                marginBottom="s"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Box alignItems="center">
                  <Bubble
                    size="32"
                    color={theme.colors.fertilizer}
                    variant="Broken"
                  />
                  <Text fontSize={wp(2.5)}>Gedüngt vor</Text>
                </Box>

                <Text fontSize={wp(3.2)}>
                  {lastFertilize
                    ? moment(lastFertilize.taskDate)
                        .locale("de-de")
                        .fromNow(true)
                    : "~"}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};

export default LastWorks;
