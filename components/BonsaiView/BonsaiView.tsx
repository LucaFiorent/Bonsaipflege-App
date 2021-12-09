import { useTheme, visible } from "@shopify/restyle";
import * as React from "react";
import { Image, Pressable, SafeAreaView, ScrollView } from "react-native";
import { Theme } from "../../theme/theme";

//components
import Box from "../Common/Box";
import Text from "../Common/Text";

//stores
import { userBonsaisStore, userStore } from "../../dataStores/accountStore";

import "react-native-gesture-handler";
import { FC, useState } from "react";

import moment from "moment";
import Modal from "../Common/Modal";
import db from "../../firebase/firebaseConfig";
import { BonsaiViewParams } from "../../types/bottomSheetTypes";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EreignisView from "./Ereignis/EreignisView";
import WorksView from "./Arbeiten/WorksView";
import {
  BookSquare,
  Edit2,
  InfoCircle,
  TaskSquare,
  Trash,
} from "iconsax-react-native";
import firebase from "firebase";

const Tab = createMaterialTopTabNavigator();

const BonsaiView: FC<BonsaiViewParams> = ({ navigation, route }) => {
  console.log(route);

  React.useLayoutEffect(() => {
    route.params.pagePath !== "community"
      ? navigation.setOptions({
          headerTitle: "BonsaiViews" && "Alle Bonsais",
        })
      : navigation.setOptions({
          headerTitle: "BonsaiViews" && selectedBonsai.name,
        });
  }, [navigation]);

  const theme = useTheme<Theme>();
  const userData = userStore();
  const { myBonsais } = userBonsaisStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelectedInfo] = useState(false);
  const bonsaiDTasksFertilize = null;
  const bonsaiDTasksWatering = null;

  const selRouteBonsai = route.params.bonsai;
  const user = route.params.user;

  const selectedFilterBonsai = myBonsais.filter((bonsai) => {
    if (bonsai.id === selRouteBonsai.id) return bonsai;
  });
  const selectedBonsai =
    user.id === userData.id ? selectedFilterBonsai[0] : selRouteBonsai;

  const deleteBonsaiHandler = async () => {
    let newBonsaiList = myBonsais.filter(
      (bonsai) => bonsai.id !== selRouteBonsai.id
    );
    userBonsaisStore.setState((state) => {
      newBonsaiList;
    });

    if (selRouteBonsai.image) {
      var fileRef = firebase.storage().refFromURL(selRouteBonsai.image);
      fileRef.delete();
    }

    const allBonsais = db.collection("bonsais").doc(selRouteBonsai.id);
    allBonsais.delete();
    setModalVisible(!visible);
    navigation.navigate("MyScreen");
  };

  return selectedBonsai ? (
    <Box flex={1} marginHorizontal="m">
      <SafeAreaView>
        <ScrollView>
          <Box>
            {/* User Image and Name only to Bonsai of Community   */}
            {user.id !== userData.id ? (
              <Box flex={1} flexDirection="row" marginTop="l">
                <Box>
                  <Box>
                    <Image
                      source={
                        user.avatar === ""
                          ? require("../../assets/images/programmer.png")
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
                justifyContent={
                  user.id === userData.id ? "space-between" : "space-around"
                }
                alignItems="center"
                marginVertical="m"
              >
                {/* Edit Button only visible on own Bonsai   */}
                {user.id === userData.id && (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("UpdateBonsai", {
                        bonsai: selRouteBonsai,
                        user: user,
                      })
                    }
                  >
                    <Box>
                      <Edit2
                        size={28}
                        color={theme.colors.iconInactive}
                        variant="Broken"
                      />
                    </Box>
                  </Pressable>
                )}
                <Box>
                  <Text variant="title">{selectedBonsai.name}</Text>
                </Box>
                {/* Delete Button only visible on own Bonsai   */}
                {user.id === userData.id && (
                  <Pressable onPress={() => setModalVisible(true)}>
                    <Box>
                      <Trash
                        size={28}
                        color={theme.colors.error}
                        variant="Outline"
                      />
                    </Box>
                  </Pressable>
                )}
              </Box>
              <Box>
                <Box alignItems="center">
                  <Image
                    source={{ uri: selectedBonsai.image }}
                    style={{
                      width: "100%",
                      height: 250,
                      borderRadius: theme.borderRadii.m,
                    }}
                  />
                </Box>
                <Box flex={1} position="absolute" right={0} bottom={0}>
                  <Pressable onPress={() => setSelectedInfo(!selected)}>
                    <Box
                      backgroundColor={
                        selected ? "primaryGreenColor" : "primarySalmonColor"
                      }
                      padding="s"
                      borderTopLeftRadius="m"
                      borderBottomRightRadius="m"
                    >
                      <InfoCircle
                        style={{
                          transform: [{ rotateX: "180deg" }],
                        }}
                        size={27}
                        color={theme.colors.textOnDark}
                      />
                    </Box>
                  </Pressable>
                </Box>
              </Box>
              {/* Show Bonsai Infos */}
              {selected && (
                <Box
                  flex={1}
                  backgroundColor="mainBackground"
                  flexDirection="row"
                  paddingHorizontal="l"
                  paddingVertical="m"
                  marginTop="s"
                  borderRadius="m"
                  justifyContent="space-between"
                  borderWidth={1}
                  borderColor="primaryGreenColor"
                >
                  <Box flex={1} maxWidth="45%">
                    <Box marginVertical="xs">
                      <Text fontSize={14}>Typ:</Text>
                      <Text fontSize={16}>{selectedBonsai.type}</Text>
                    </Box>
                    <Box
                      marginVertical="s"
                      borderBottomWidth={1}
                      borderBottomColor="greyBackground"
                    />
                    <Box marginVertical="xs">
                      <Text fontSize={14}>Form:</Text>
                      <Text fontSize={16}>{selectedBonsai.form}</Text>
                    </Box>
                  </Box>

                  <Box flex={1} maxWidth="45%">
                    <Box marginVertical="xs">
                      <Text fontSize={14}>Größe: </Text>
                      <Text fontSize={16}>
                        {selectedBonsai ? selectedBonsai.size : "~"}
                      </Text>
                    </Box>
                    <Box
                      marginVertical="s"
                      borderBottomWidth={1}
                      borderBottomColor="greyBackground"
                    />
                    <Box marginVertical="xs">
                      <Text fontSize={14}>Alter: </Text>
                      <Text fontSize={16}>
                        {moment(selectedBonsai.acquisitionDate).format(
                          "D MMM. YY"
                        )}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
      {/* Navigation */}
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: theme.colors.textHighContrast,
            tabBarIndicatorStyle: {
              backgroundColor: theme.colors.primaryGreenColor,
              height: 4,
            },
            tabBarItemStyle: {
              flexDirection: "row",
              alignItems: "center",
            },
            tabBarLabelStyle: {
              fontSize: 15,
              fontFamily: "OpenSans-Regular",
            },
            tabBarPressColor: theme.colors.primaryGreenColor,
            tabBarStyle: {
              elevation: 0,
              backgroundColor: "transparent",
            },
            tabBarIcon: ({ color }) => {
              if (route.name === "arbeiten") {
                return <TaskSquare variant="Broken" size={26} color={color} />;
              } else if (route.name === "ereignis") {
                return <BookSquare variant="Broken" size={26} color={color} />;
              }
            },
          })}
          initialRouteName="arbeiten"
        >
          <Tab.Screen
            children={() => (
              <WorksView user={user} bonsaiData={selectedBonsai} />
            )}
            name="arbeiten"
          />
          <Tab.Screen name="ereignis" children={() => <EreignisView />} />
        </Tab.Navigator>
      </SafeAreaView>
      {/* Delete Modal  */}
      {user.id === userData.id && (
        <Modal
          onPressHandler={deleteBonsaiHandler}
          setModalVisible={setModalVisible}
          visible={modalVisible}
          data={selectedBonsai.name}
          type="delete"
          title="Vorsicht!"
          primary={theme.colors.error}
        />
      )}
    </Box>
  ) : null;
};
export default BonsaiView;
