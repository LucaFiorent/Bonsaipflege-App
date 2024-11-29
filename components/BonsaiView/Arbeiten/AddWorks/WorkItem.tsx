import React, { FC, useState } from "react";
import theme from "../../../../theme/theme";
import Box from "../../../Common/Box";
import Text from "../../../Common/Text";
import { Image, Pressable } from "react-native";
import moment from "moment";
import { WorkItemProps } from "../../../../types/WorkViewTypes";
import { Bubble, Drop, Scissor, Trash } from "iconsax-react-native";
import ModalMessage from "../../../Common/ModalMessage";
import firebase from "firebase";
import { db, storage } from "../../../../firebase/firebaseConfig";
import { userStore } from "../../../../dataStores/accountStore";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { deleteObject, ref } from "firebase/storage";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

const WorkItem: FC<WorkItemProps> = ({ task, bonsai, user }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const userData = userStore();

  moment.locale("de");

  const deleteTaskHandler = async () => {
    let taskID = task.taskID;

    let selTask = bonsai.tasks.filter((taskItem: any) => {
      if (taskItem.taskID !== taskID) return taskItem;
    });

    // if (selTask.taskImage) {
    //   var fileRef = firebase.storage().refFromURL(task.taskImage);
    //   fileRef.delete();
    // }

    // db.collection("bonsais")
    //   .doc(bonsai.id)
    //   .set({
    //     ...bonsai,
    //     tasks: selTask,
    //     updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
    //   });
    // setDeleteModalVisible(!deleteModalVisible);
    if (task.taskImage) {
      const fileRef = ref(storage, task.taskImage);
      await deleteObject(fileRef).catch((error) => {
        console.error("Error deleting file:", error);
      });
    }

    await updateDoc(doc(db, "bonsais", bonsai.id), {
      ...bonsai,
      tasks: selTask,
      updatedOn: serverTimestamp(),
    });

    setDeleteModalVisible(!deleteModalVisible);
  };

  return (
    <>
      <Box
        alignContent="center"
        backgroundColor="mainBackground"
        marginTop="xs"
        marginBottom="m"
        borderRadius="m"
        padding="s"
        position="relative"
      >
        <Box flexDirection="row">
          <Box
            flex={0}
            width={wp(17)}
            height={wp(17)}
            backgroundColor={
              task.taskImage !== ""
                ? "primaryLightSalmonColor"
                : task.doneTask.includes("Bewässerung")
                ? "watering"
                : task.doneTask.includes("Beschneidung")
                ? "primaryBGColor"
                : task.doneTask.includes("Dünger")
                ? "fertilizer"
                : "greyBackground"
            }
            borderRadius="m"
            alignItems="center"
            justifyContent="center"
          >
            {task.taskImage !== "" ? (
              <Image
                source={{ uri: task.taskImage }}
                style={{
                  width: wp(17),
                  height: wp(17),
                  borderRadius: theme.borderRadii.m,
                }}
              />
            ) : task.doneTask.includes("Bewässerung") ? (
              <Drop
                size={wp(8)}
                variant="Broken"
                color={theme.colors.textOnDark}
              />
            ) : task.doneTask.includes("Beschneidung") ? (
              <Scissor
                size={wp(8)}
                variant="Outline"
                color={theme.colors.textOnDark}
              />
            ) : (
              task.doneTask.includes("Dünger") && (
                <Bubble
                  size={wp(8)}
                  variant="Broken"
                  color={theme.colors.textOnDark}
                />
              )
            )}
          </Box>

          {task.taskNote !== "" && (
            <Box flex={3} marginLeft="m" marginRight="s">
              <Box justifyContent="flex-end">
                <Box marginBottom="xxs">
                  <Text variant="body" fontSize={11}>
                    Notiz:
                  </Text>
                </Box>
                <Box marginBottom="s">
                  <Text variant="body" fontSize={13}>
                    {task.taskNote}
                  </Text>
                </Box>
              </Box>
            </Box>
          )}
          {user.id === userData.id && (
            <Box
              flexDirection="row"
              justifyContent="flex-end"
              position="absolute"
              right={wp(-3.4)}
              top={wp(-6)}
            >
              <Pressable
                onPress={() => setDeleteModalVisible(!deleteModalVisible)}
              >
                <Box
                  marginRight="xs"
                  backgroundColor="mainBackground"
                  padding="s"
                  borderTopRightRadius="xl"
                  borderTopLeftRadius="xl"
                >
                  <Trash size={wp(6.5)} color={theme.colors.error} />
                </Box>
              </Pressable>
            </Box>
          )}
        </Box>
        <Box marginTop="ms" flexDirection="row" justifyContent="space-between">
          <Box flex={1} flexDirection="row" flexWrap="wrap">
            {task.doneTask.map((item) => (
              <Box
                key={item}
                backgroundColor="primaryBGColor"
                marginRight="s"
                paddingVertical="s"
                paddingHorizontal="ms"
                borderRadius="xxl"
                maxWidth="44%"
              >
                <Text
                  variant="inputTitle"
                  color="textHighContrast"
                  fontSize={wp(2.8)}
                >
                  {item}
                </Text>
              </Box>
            ))}
          </Box>

          <Box flex={0} alignItems="flex-end" justifyContent="flex-end">
            <Box marginRight="xs">
              <Text variant="body" fontSize={wp(2.3)}>
                Dürchgeführt:
              </Text>
            </Box>
            <Box marginRight="xs">
              <Text fontSize={wp(3)}>
                {moment(task.taskDate).format("D MMM YYYY")}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <ModalMessage
        onPressHandler={deleteTaskHandler}
        setModalVisible={setDeleteModalVisible}
        visible={deleteModalVisible}
        data={moment(task.taskDate).format("D MMM YYYY")}
        type="delete"
        title="Vorsicht!"
        category="work"
        primary={theme.colors.error}
      />
    </>
  );
};
export default WorkItem;
