import { useTheme } from "@shopify/restyle";
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
import ModalMessage from "../Common/ModalMessage";
import db from "../../firebase/firebaseConfig";
import { BonsaiViewParams } from "../../types/bottomSheetTypes";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import EreignisView from "./Ereignis/EreignisView";
import WorksView from "./Arbeiten/WorksView";
import {
  AddCircle,
  BookSquare,
  Bubble,
  CloseCircle,
  Drop,
  Edit2,
  InfoCircle,
  More,
  Scissor,
  TaskSquare,
  Trash,
} from "iconsax-react-native";
import firebase from "firebase";
import AddWorksModal from "./Arbeiten/AddWorks/AddWorksModal";
import NextStepButton from "../Common/NextStepButton";
import { v4 as uuidv4 } from "uuid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Modal from "react-native-modal";

const Tab = createMaterialTopTabNavigator();

const BonsaiView: FC<BonsaiViewParams> = ({ navigation, route }) => {
  // prepare alternative titels for navigations
  React.useLayoutEffect(() => {
    route.params.pagePath === "community"
      ? route.params.user.id === userData.id
        ? navigation.setOptions({
            headerTitle: "Dein Bonsai: " + selectedBonsai.name,
          })
        : navigation.setOptions({
            headerTitle: selectedBonsai.name,
          })
      : route.params.pagePath === "home"
      ? navigation.setOptions({
          headerTitle: selectedBonsai.name,
        })
      : navigation.setOptions({
          headerTitle: selectedBonsai.name,
        });
  }, [navigation]);

  const theme = useTheme<Theme>();
  //get data from store
  const userData = userStore();
  const { myBonsais } = userBonsaisStore();

  // get data trow route params
  const selRouteBonsai = route.params.bonsai;
  const user = route.params.user;

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selected, setSelectedInfo] = useState(false);

  // delete bonsai logic
  const selectedFilterBonsai = myBonsais.filter((bonsai) => {
    if (bonsai.id === selRouteBonsai.id) return bonsai;
  });

  const selectedBonsai =
    user.id === userData.id ? selectedFilterBonsai[0] : selRouteBonsai;

  const deleteBonsaiHandler = async () => {
    setDeleteModalVisible(!deleteModalVisible);
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
    navigation.navigate("MyScreen");
  };

  // add work logic
  const [addWorksVisible, setAddWorksVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [taskDate, settaskDate] = useState(new Date());

  const sendTasks = async (fastTask: string) => {
    settaskDate(new Date());
    let task = {
      taskID: uuidv4(),
      taskImage: "",
      taskDate: taskDate,
      doneTask: [
        fastTask === "Dünger"
          ? fastTask
          : fastTask === "Beschneidung"
          ? fastTask
          : fastTask === "Bewässerung" && fastTask,
      ],
      taskNote:
        fastTask === "Dünger"
          ? "Wurde am " + moment(taskDate).format("D MMM YY") + " gedüngt."
          : fastTask === "Beschneidung"
          ? "Wurde am " + moment(taskDate).format("D MMM YY") + " beschnitten."
          : fastTask === "Bewässerung" &&
            "Wurde am " + moment(taskDate).format("D MMM YY") + " bewässert.",
    };
    addData(task);
    setAddWorksVisible(!addWorksVisible);
  };
  // send tasks to database
  const addData = async (task: any) => {
    if (task) {
      userBonsaisStore.setState((state) => {
        let newBonsaiTask = state.myBonsais.map((item) => {
          if (item.id === selectedBonsai.id) {
            let bonsaiTasks = item.tasks;
            bonsaiTasks.push(task);
            return bonsaiTasks;
          }
        });
      });

      let mySelBonsai = myBonsais.filter(
        (item) => item.id === selectedBonsai.id
      );
      let formatElement = mySelBonsai[0];

      if (task) {
        db.collection("bonsais")
          .doc(selectedBonsai.id)
          .set({
            ...formatElement,
            updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
          });
      }
    }
  };

  return selectedBonsai ? (
    <>
      {user.id === userData.id && !addWorksVisible && (
        <NextStepButton
          onPress={() => setAddWorksVisible(!addWorksVisible)}
          title="Arbeit hinzufügen"
          primary="primarySalmonColor"
          index={1}
          icon={
            <AddCircle
              size={wp(6.5)}
              color={theme.colors.textOnDark}
              variant="Broken"
            />
          }
        />
      )}
      {addWorksVisible && (
        <Modal
          backdropOpacity={0.7}
          isVisible={addWorksVisible}
          style={{ marginHorizontal: wp(3.1) }}
          animationIn="bounceInRight"
          animationInTiming={700}
          backdropColor={theme.colors.textOnDark}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
        >
          <Box position="absolute" right={0} bottom={68} zIndex={1}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
                marginTop="m"
              >
                <Text
                  marginRight="m"
                  color="textHighContrast"
                  fontSize={wp(3)}
                  variant="title"
                >
                  mehr
                </Text>
                <Box
                  backgroundColor="primarySalmonColor"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="xxl"
                  width={wp(12)}
                  height={wp(12)}
                >
                  <More
                    size={wp(6.5)}
                    variant="Outline"
                    color={theme.colors.textOnDark}
                  />
                </Box>
              </Box>
            </Pressable>

            <Pressable
              onPress={() => {
                sendTasks("Dünger");
              }}
            >
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
                marginTop="m"
              >
                <Text
                  marginRight="m"
                  color="textHighContrast"
                  fontSize={wp(3)}
                  variant="title"
                >
                  düngen
                </Text>
                <Box
                  backgroundColor="fertilizer"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="xxl"
                  width={wp(12)}
                  height={wp(12)}
                >
                  <Bubble
                    size={wp(6.5)}
                    variant="Broken"
                    color={theme.colors.textOnDark}
                  />
                </Box>
              </Box>
            </Pressable>

            <Pressable
              onPress={() => {
                sendTasks("Beschneidung");
              }}
            >
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
                marginTop="m"
              >
                <Text
                  marginRight="m"
                  color="textHighContrast"
                  fontSize={wp(3)}
                  variant="title"
                >
                  schneiden
                </Text>
                <Box
                  backgroundColor="primaryBGColor"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="xxl"
                  width={wp(12)}
                  height={wp(12)}
                >
                  <Scissor
                    size={wp(6.5)}
                    variant="Outline"
                    color={theme.colors.textOnDark}
                  />
                </Box>
              </Box>
            </Pressable>
            <Pressable
              onPress={() => {
                sendTasks("Bewässerung");
              }}
            >
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
                marginTop="m"
              >
                <Text
                  marginRight="m"
                  color="textHighContrast"
                  fontSize={wp(3)}
                  variant="title"
                >
                  bewässern
                </Text>
                <Box
                  backgroundColor="watering"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="xxl"
                  width={wp(12)}
                  height={wp(12)}
                >
                  <Drop
                    size={wp(6.5)}
                    variant="Broken"
                    color={theme.colors.textOnDark}
                  />
                </Box>
              </Box>
            </Pressable>

            <Pressable onPress={() => setAddWorksVisible(!addWorksVisible)}>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
                marginTop="m"
              >
                <Text
                  marginRight="m"
                  color="error"
                  fontSize={wp(3)}
                  variant="title"
                >
                  abbrechen
                </Text>
                <Box
                  backgroundColor="error"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="xxl"
                  width={wp(12)}
                  height={wp(12)}
                >
                  <CloseCircle
                    size={wp(6.5)}
                    variant="Broken"
                    color={theme.colors.textOnDark}
                  />
                </Box>
              </Box>
            </Pressable>
          </Box>
        </Modal>
      )}
      <AddWorksModal
        setModalVisible={setModalVisible}
        visible={modalVisible}
        data={selectedBonsai}
        setAddWorksVisible={setAddWorksVisible}
        addWorksVisible={addWorksVisible}
        title="Arbeit hinzufügen"
      />
      <Box flex={1} marginHorizontal="m" zIndex={0}>
        <SafeAreaView>
          <ScrollView>
            <Box>
              {/* User Image and Name only to Bonsai of Community   */}
              {user.id !== userData.id ? (
                <Pressable
                  style={{ zIndex: 2 }}
                  onPress={() => {
                    navigation.navigate("CommunityUserProfileView", {
                      userOfBonsai: user,
                    });
                  }}
                >
                  <Box
                    flexDirection="row"
                    alignSelf="flex-end"
                    alignItems="center"
                    borderRadius="xxl"
                    paddingVertical="xs"
                    marginTop="ms"
                    paddingRight="xs"
                    paddingLeft="m"
                    backgroundColor="mainBackground"
                    style={{ marginBottom: wp(-6), zIndex: 1 }}
                  >
                    <Box marginRight="m">
                      <Text variant="title" color="headline">
                        {user.nickname}
                      </Text>
                    </Box>
                    <Image
                      source={
                        user.avatar === ""
                          ? require("../../assets/images/programmer.png")
                          : { uri: user.avatar }
                      }
                      style={{
                        width: wp(8),
                        height: wp(8),
                        borderRadius: theme.borderRadii.xxl,
                      }}
                    />
                  </Box>
                </Pressable>
              ) : null}

              <Box flex={1}>
                {/* Edit Button only visible on own Bonsai   */}
                {user.id === userData.id && (
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    marginVertical="m"
                  >
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
                          size={wp(6.5)}
                          color={theme.colors.iconInactive}
                          variant="Broken"
                        />
                      </Box>
                    </Pressable>
                    <Box>
                      <Text variant="title">{selectedBonsai.name}</Text>
                    </Box>
                    <Pressable onPress={() => setDeleteModalVisible(true)}>
                      <Box>
                        <Trash
                          size={wp(6.5)}
                          color={theme.colors.error}
                          variant="Outline"
                        />
                      </Box>
                    </Pressable>
                  </Box>
                )}
                <Box>
                  <Box alignItems="center">
                    <Image
                      source={{ uri: selectedBonsai.image }}
                      style={{
                        width: "100%",
                        height: hp(28),
                        borderRadius: theme.borderRadii.m,
                      }}
                    />
                  </Box>
                  <Box flex={1} position="absolute" right={0} bottom={0}>
                    <Pressable onPress={() => setSelectedInfo(!selected)}>
                      <Box
                        backgroundColor={
                          selected ? "primaryGreenColor" : "primaryBGColor"
                        }
                        padding="s"
                        borderTopLeftRadius="m"
                        borderBottomRightRadius="m"
                      >
                        <InfoCircle
                          style={{
                            transform: [{ rotateX: "180deg" }],
                          }}
                          size={wp(6)}
                          color={
                            selected
                              ? theme.colors.textOnDark
                              : theme.colors.textHighContrast
                          }
                          variant="Broken"
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
                        <Text fontSize={wp(3)}>Art:</Text>
                        <Text fontSize={wp(3.4)}>{selectedBonsai.type}</Text>
                      </Box>
                      <Box
                        marginVertical="s"
                        borderBottomWidth={1}
                        borderBottomColor="greyBackground"
                      />
                      <Box marginVertical="xs">
                        <Text fontSize={wp(3)}>Form:</Text>
                        <Text fontSize={wp(3.4)}>{selectedBonsai.form}</Text>
                      </Box>
                    </Box>

                    <Box flex={1} maxWidth="45%">
                      <Box marginVertical="xs">
                        <Text fontSize={wp(3)}>Größe: </Text>
                        <Text fontSize={wp(3.4)}>
                          {selectedBonsai ? selectedBonsai.size : "~"}
                        </Text>
                      </Box>
                      <Box
                        marginVertical="s"
                        borderBottomWidth={1}
                        borderBottomColor="greyBackground"
                      />
                      <Box marginVertical="xs">
                        <Text fontSize={wp(3)}>Alter: </Text>
                        <Text fontSize={wp(3.4)}>
                          {moment(selectedBonsai.acquisitionDate).fromNow(true)}
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
                fontSize: wp(4),
                fontFamily: "OpenSans-Regular",
              },
              tabBarPressColor: theme.colors.primaryGreenColor,
              tabBarStyle: {
                elevation: 0,
                backgroundColor: "transparent",
              },
              tabBarIcon: ({ color }) => {
                if (route.name === "arbeiten") {
                  return (
                    <TaskSquare variant="Broken" size={wp(5.8)} color={color} />
                  );
                } else if (route.name === "ereignis") {
                  return (
                    <BookSquare variant="Broken" size={wp(5.8)} color={color} />
                  );
                }
              },
              tabBarIconStyle: {
                alignItems: "center",
                justifyContent: "center",
              },
            })}
            initialRouteName="arbeiten"
          >
            <Tab.Screen
              children={() => (
                <WorksView
                  user={user}
                  bonsaiData={selectedBonsai}
                  setAddWorksVisible={setAddWorksVisible}
                  addWorksVisible={addWorksVisible}
                />
              )}
              name="arbeiten"
            />
            {/* <Tab.Screen name="ereignis" children={() => <EreignisView />} /> */}
          </Tab.Navigator>
        </SafeAreaView>
        {/* Delete Modal  */}
        {user.id === userData.id && (
          <ModalMessage
            onPressHandler={deleteBonsaiHandler}
            setModalVisible={setDeleteModalVisible}
            visible={deleteModalVisible}
            data={selectedBonsai.name}
            type="delete"
            title="Vorsicht!"
            primary={theme.colors.error}
          />
        )}
      </Box>
    </>
  ) : null;
};
export default BonsaiView;
