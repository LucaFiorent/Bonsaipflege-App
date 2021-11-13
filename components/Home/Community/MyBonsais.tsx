import { useTheme } from "@shopify/restyle";
import * as React from "react";
import { Image, Pressable, SafeAreaView, ScrollView } from "react-native";
import { Theme } from "../../../theme/theme";

//components
import Box from "../../Common/Box";
import Text from "../../Common/Text";

//stores
import { userBonsaisStore, userStore } from "../../../dataStores/accountStore";
import { SimpleLineIcons } from "@expo/vector-icons";

import "react-native-gesture-handler";
import { FC, useEffect, useState } from "react";
import db from "../../../firebase/firebaseConfig";

export type MyBonsaisProps = {
  bonsai: any;
};

const MyBonsais: FC<MyBonsaisProps> = ({ bonsai }) => {
  const theme = useTheme<Theme>();
  const userData = userStore();

  return (
    <Box marginBottom="xl">
      <Box flex={1} flexDirection="row" alignItems="center">
        <Box alignItems="center">
          <Image
            source={
              bonsai.image === ""
                ? require("../../../assets/images/bonsai.jpg")
                : { uri: bonsai.image }
            }
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
              <Text fontSize={16}>{bonsai.type}</Text>
            </Box>
            <Box marginVertical="xs">
              <Text fontSize={14}>Größe:</Text>
              <Text fontSize={16}>{bonsai.size}</Text>
            </Box>
          </Box>
          <Box>
            <Box marginVertical="xs">
              <Text fontSize={14}>Form:</Text>
              <Text fontSize={16}>{bonsai.form}</Text>
            </Box>
            <Box marginVertical="xs">
              <Text fontSize={14}>Alter:</Text>
              <Text fontSize={16}> {bonsai.acquisitionDate}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default MyBonsais;
