import React, { FC, useState } from "react";
import theme from "../../../../theme/theme";
import Box from "../../../Common/Box";
import Text from "../../../Common/Text";
import { Image, Pressable } from "react-native";
import moment from "moment";
import { WorkItemProps } from "../../../../types/WorkViewTypes";
import { Bubble, Drop, Scissor, Trash } from "iconsax-react-native";
import Modal from "../../../Common/Modal";
import firebase from "firebase";
import db from "../../../../firebase/firebaseConfig";

const WorkItem: FC<WorkItemProps> = ({ task, bonsai }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  moment.locale("de");

  const deleteTaskHandler = () => {
    let taskID = task.taskID;

    let selTask = bonsai.tasks.filter((taskItem: any) => {
      if (taskItem.taskID !== taskID) return taskItem;
    });

    if (selTask.taskImage) {
      var fileRef = firebase.storage().refFromURL(task.taskImage);
      fileRef.delete();
    }

    db.collection("bonsais")
      .doc(bonsai.id)
      .set({ ...bonsai, tasks: selTask });
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
            width={80}
            height={80}
            backgroundColor="primaryLightSalmonColor"
            borderRadius="m"
            alignItems="center"
            justifyContent="center"

            // style={
            //   task.taskImage === ""
            //     ? { backgroundColor: theme.colors.primaryLightSalmonColor }
            //     : null
            // }
          >
            {task.taskImage !== "" ? (
              <Image
                source={{ uri: task.taskImage }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: theme.borderRadii.m,
                }}
              />
            ) : task.doneTask.includes("Bewässerung") ? (
              <Drop
                size={44}
                variant="Broken"
                color={theme.colors.textOnDark}
              />
            ) : task.doneTask.includes("Beschneidung") ? (
              <Scissor
                size={44}
                variant="Outline"
                color={theme.colors.textOnDark}
              />
            ) : (
              task.doneTask.includes("Dünger") && (
                <Bubble
                  size={44}
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

          <Box
            flexDirection="row"
            justifyContent="flex-end"
            position="absolute"
            right={-12}
            top={-22}
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
                <Trash size={26} color={theme.colors.error} />
              </Box>
            </Pressable>
          </Box>
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
                  fontSize={12}
                >
                  {item}
                </Text>
              </Box>
            ))}
          </Box>

          <Box flex={0} alignItems="flex-end" justifyContent="flex-end">
            <Box marginRight="xs">
              <Text variant="body" fontSize={11}>
                Dürchgeführt:
              </Text>
            </Box>
            <Box marginRight="xs">
              <Text fontSize={13}>
                {moment(task.taskDate).format("D MMM YYYY")}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal
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
