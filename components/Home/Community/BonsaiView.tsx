import { useTheme, visible } from "@shopify/restyle";
import * as React from "react";
import { Image, Pressable, SafeAreaView, ScrollView } from "react-native";
import { Theme } from "../../../theme/theme";

//components
import Box from "../../Common/Box";
import Text from "../../Common/Text";

//stores
import { userStore } from "../../../dataStores/accountStore";

import "react-native-gesture-handler";
import { FC, useState } from "react";

import moment from "moment";
import { SimpleLineIcons } from "@expo/vector-icons";
import Modal from "../../Common/Modal";
import db from "../../../firebase/firebaseConfig";
type BonsaiViewParams = {
  route: {
    params: {
      bonsai: {};
      user: string;
    };
  };
  navigation: any;
};

const BonsaiView: FC<BonsaiViewParams> = ({ navigation, route }) => {
  console.log(route);

  const theme = useTheme<Theme>();
  const userData = userStore();
  const [modalVisible, setModalVisible] = useState(false);
  const bonsaiDTasksFertilize = null;
  const bonsaiDTasksWatering = null;
  const selBonsai = route.params.bonsai;
  const user = route.params.user;
  // console.log(user.userId);

  // console.log(selBonsai.id);
  // console.log(userData.id);

  const deleteBonsaiHandler = async () => {
    const allBonsais = db.collection("bonsais").doc(selBonsai.id);
    allBonsais.delete();
    setModalVisible(!visible);
    navigation.navigate("MyScreen");
  };

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <SafeAreaView>
        <ScrollView>
          <Box marginHorizontal="m">
            {user.id !== userData.id ? (
              <Box flex={1} flexDirection="row" marginBottom="xs">
                <Box>
                  <Box>
                    <Image
                      source={
                        user.avatar === ""
                          ? require("../../../assets/images/programmer.png")
                          : { uri: userData.avatar }
                      }
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: theme.borderRadii.xxl,
                      }}
                    />
                  </Box>
                </Box>
                <Box marginLeft="m">
                  <Text variant="title" marginVertical="xs" color="headline">
                    {user.nickname}
                  </Text>
                </Box>
              </Box>
            ) : null}

            <Box flex={1}>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginVertical="l"
              >
                <Pressable
                  onPress={() =>
                    navigation.navigate("UpdateBonsai", {
                      bonsai: selBonsai,
                      user: user,
                    })
                  }
                >
                  <Box>
                    <SimpleLineIcons
                      name="pencil"
                      size={24}
                      color={theme.colors.iconInactive}
                    />
                  </Box>
                </Pressable>

                <Box>
                  <Text variant="title">{selBonsai.name}</Text>
                </Box>
                <Pressable onPress={() => setModalVisible(true)}>
                  <Box>
                    <SimpleLineIcons
                      name="trash"
                      size={24}
                      color={theme.colors.error}
                    />
                  </Box>
                </Pressable>
              </Box>
              <Box alignItems="center">
                <Image
                  source={{ uri: selBonsai.image }}
                  style={{
                    width: "100%",
                    height: 260,
                    borderRadius: theme.borderRadii.l,
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
                    <Text fontSize={16}>{selBonsai.type}</Text>
                  </Box>
                  <Box marginVertical="xs">
                    <Text fontSize={14}>Form:</Text>
                    <Text fontSize={16}>{selBonsai.form}</Text>
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
                      {moment(selBonsai.acquisitionDate).format("D MMM. YY")}
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
        </ScrollView>
      </SafeAreaView>
      <Modal
        onPressHandler={deleteBonsaiHandler}
        setModalVisible={setModalVisible}
        visible={modalVisible}
        data={selBonsai.name}
        type="delete"
        title="Vorsicht!"
        primary={theme.colors.error}
      />
    </Box>
  );
};
export default BonsaiView;
