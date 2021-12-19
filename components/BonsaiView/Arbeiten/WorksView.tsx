import * as React from "react";
import { useTheme } from "@shopify/restyle";
import { FC } from "react";
import { ScrollView } from "react-native";
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

const WorksView: FC<WorksViewProps> = ({ user, bonsaiData }) => {
  const theme = useTheme<Theme>();

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
              <Box alignItems="center" justifyContent="center" width="80%">
                <NoteAdd
                  size={wp(14)}
                  color={theme.colors.error}
                  variant="Broken"
                />
                <Box justifyContent="center">
                  <Text
                    variant="h3"
                    color="error"
                    textAlign="center"
                    fontWeight="bold"
                  >
                    Du hast noch keine Arbeiten hinzugefügt!
                  </Text>
                  <Text variant="placeholder" color="error" textAlign="center">
                    Füge neue Arbeiten hinzu
                  </Text>
                </Box>
                <Text></Text>
              </Box>
            </Box>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default WorksView;
