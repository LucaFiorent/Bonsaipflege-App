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

export type MyBonsaisProps = {
  bonsaiData: any;
  navigation: any;
  user: any;
};

const MyBonsais: FC<MyBonsaisProps> = ({ bonsaiData, navigation, user }) => {
  const theme = useTheme<Theme>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("BonsaiViewStack", {
          screen: "BonsaiView",
          params: {
            bonsai: bonsaiData,
            user: user,
          },
        })
      }
    >
      <Box marginBottom="xl">
        <Box flex={1} flexDirection="row" alignItems="center">
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
          <Box
            flex={1}
            flexDirection="row"
            marginHorizontal="l"
            justifyContent="space-between"
          >
            <Box>
              <Box marginVertical="xs">
                <Text fontSize={14}>Typ:</Text>
                <Text fontSize={16}>{bonsaiData.type}</Text>
              </Box>
              <Box marginVertical="xs">
                <Text fontSize={14}>Größe:</Text>
                <Text fontSize={16}>{bonsaiData.size}</Text>
              </Box>
            </Box>
            <Box>
              <Box marginVertical="xs">
                <Text fontSize={14}>Form:</Text>
                <Text fontSize={16}>{bonsaiData.form}</Text>
              </Box>
              <Box marginVertical="xs">
                <Text fontSize={14}>Alter:</Text>
                <Text fontSize={16}>
                  {moment(bonsaiData.acquisitionDate).format("D MMM. YY")}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};
export default MyBonsais;
