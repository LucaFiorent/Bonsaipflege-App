import * as React from "react";
import { useTheme } from "@shopify/restyle";
import { FC } from "react";
import { Pressable, ScrollView } from "react-native";
import { Theme } from "../../../theme/theme";
//components
import Box from "../../Common/Box";
import Text from "../../Common/Text";
import { NoteAdd } from "iconsax-react-native";
import WorkItem from "./AddWorks/WorkItem";
import { WorksViewProps } from "../../../types/WorkViewTypes";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment";
import { userStore } from "../../../dataStores/accountStore";

const WorksView: FC<WorksViewProps> = ({
  user,
  bonsaiData,
  setAddWorksVisible,
  addWorksVisible,
}) => {
  const theme = useTheme<Theme>();
  const userData = userStore();

  return (
    <Box flex={1}>
      <ScrollView>
        <Box style={{ marginBottom: hp(7.5) }} marginTop="m">
          {bonsaiData.tasks.length > 0 ? (
            bonsaiData.tasks.map((item: any) => (
              <WorkItem
                key={bonsaiData.tasks.indexOf(item)}
                task={item}
                bonsai={bonsaiData}
                user={user}
              />
            ))
          ) : user.id === userData.id ? (
            <Pressable onPress={() => setAddWorksVisible(!addWorksVisible)}>
              <Box
                alignItems="center"
                backgroundColor="mainBackground"
                marginTop="xs"
                marginBottom="m"
                borderRadius="m"
                padding="s"
                justifyContent="center"
              >
                <Box
                  alignItems="center"
                  justifyContent="center"
                  width="80%"
                  paddingVertical="l"
                >
                  <NoteAdd
                    size={wp(14)}
                    color={theme.colors.iconInactive}
                    variant="Broken"
                  />
                  <Box justifyContent="center" marginTop="l">
                    <Text
                      variant="h3"
                      color="iconInactive"
                      textAlign="center"
                      fontWeight="bold"
                    >
                      Du hast noch keine Arbeiten hinzugefügt!
                    </Text>
                    <Text
                      marginTop="m"
                      variant="placeholder"
                      color="iconInactive"
                      textAlign="center"
                    >
                      Füge neue Arbeiten hinzu
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Pressable>
          ) : (
            <Box
              alignItems="center"
              backgroundColor="mainBackground"
              marginTop="xs"
              marginBottom="m"
              borderRadius="m"
              padding="s"
              justifyContent="center"
            >
              <Box
                alignItems="center"
                justifyContent="center"
                width="80%"
                paddingVertical="l"
              >
                <NoteAdd
                  size={wp(14)}
                  color={theme.colors.iconInactive}
                  variant="Broken"
                />
                <Box justifyContent="center" marginTop="l">
                  <Text
                    variant="h3"
                    color="iconInactive"
                    textAlign="center"
                    fontWeight="bold"
                  >
                    {user.nickname} hat noch keine Arbeiten hinzugefügt!
                  </Text>
                  <Text
                    marginTop="m"
                    variant="placeholder"
                    color="iconInactive"
                    textAlign="center"
                  >
                    Füge neue Arbeiten hinzu
                  </Text>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default WorksView;
