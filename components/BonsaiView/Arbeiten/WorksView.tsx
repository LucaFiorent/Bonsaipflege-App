import * as React from "react";
import { useTheme } from "@shopify/restyle";
import { FC, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { Theme } from "../../../theme/theme";
//components
import Box from "../../Common/Box";
import NextStepButton from "../../Common/NextStepButton";
import { Bubble, CloseCircle, Drop, More, Scissor } from "iconsax-react-native";
import AddWorksModal from "./AddWorks/AddWorksModal";
import WorkItem from "./AddWorks/WorkItem";
import { WorksViewProps } from "../../../types/WorkViewTypes";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { userBonsaisStore, userStore } from "../../../dataStores/accountStore";
import db from "../../../firebase/firebaseConfig";
import NextStepButton2 from "../../Common/NextStepButton2";

const WorksView: FC<WorksViewProps> = ({ user, bonsaiData }) => {
  const theme = useTheme<Theme>();
  const { myBonsais } = userBonsaisStore();
  const userData = userStore();
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
          ? "Würde am " + moment(taskDate).format("D MMM. YY") + " gedüngt."
          : fastTask === "Beschneidung"
          ? "Würde am " + moment(taskDate).format("D MMM. YY") + " beschnitten."
          : fastTask === "Bewässerung" &&
            "Würde am " + moment(taskDate).format("D MMM. YY") + " bewässert.",
    };
    addData(task);
    console.log(task);

    setAddWorksVisible(!addWorksVisible);
  };

  const addData = async (task: any) => {
    if (task) {
      userBonsaisStore.setState((state) => {
        let newBonsaiTask = state.myBonsais.map((item) => {
          if (item.id === bonsaiData.id) {
            let bonsaiTasks = item.tasks;
            bonsaiTasks.push(task);
            return bonsaiTasks;
          }
        });
      });

      let mySelBonsai = myBonsais.filter((item) => item.id === bonsaiData.id);
      let formatElement = mySelBonsai[0];

      if (task) {
        db.collection("bonsais")
          .doc(bonsaiData.id)
          .set({ ...formatElement });
      }
    }
  };

  return (
    <Box flex={1}>
      <ScrollView>
        <Box marginBottom="x3l" marginTop="m">
          {bonsaiData.tasks &&
            bonsaiData.tasks.map((item: any) => (
              <WorkItem
                key={bonsaiData.tasks.indexOf(item)}
                task={item}
                bonsai={bonsaiData}
              />
            ))}
        </Box>
      </ScrollView>

      {user.id === userData.id && !addWorksVisible && (
        <NextStepButton
          onPress={() => setAddWorksVisible(!addWorksVisible)}
          title="Arbeit Hinzufügen"
          primary="primarySalmonColor"
          icon="plus"
        />
      )}

      {addWorksVisible && (
        <Box position="absolute" right={15} bottom={20} zIndex={1}>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Box
              backgroundColor="primarySalmonColor"
              justifyContent="center"
              alignItems="center"
              borderRadius="xxl"
              width={54}
              height={54}
              marginTop="m"
            >
              <More
                size={26}
                variant="Outline"
                color={theme.colors.textOnDark}
              />
            </Box>
          </Pressable>
          <Pressable
            onPress={() => {
              sendTasks("Dünger");
            }}
          >
            <Box
              backgroundColor="fertilizer"
              justifyContent="center"
              alignItems="center"
              borderRadius="xxl"
              width={54}
              height={54}
              marginTop="m"
            >
              <Bubble
                size={26}
                variant="Broken"
                color={theme.colors.textOnDark}
              />
            </Box>
          </Pressable>
          <Pressable
            onPress={() => {
              sendTasks("Beschneidung");
            }}
          >
            <Box
              backgroundColor="primaryBGColor"
              justifyContent="center"
              alignItems="center"
              borderRadius="xxl"
              width={54}
              height={54}
              marginTop="m"
            >
              <Scissor
                size={26}
                variant="Outline"
                color={theme.colors.textOnDark}
              />
            </Box>
          </Pressable>
          <Pressable
            onPress={() => {
              sendTasks("Bewässerung");
            }}
          >
            <Box
              backgroundColor="watering"
              justifyContent="center"
              alignItems="center"
              borderRadius="xxl"
              width={54}
              height={54}
              marginTop="m"
            >
              <Drop
                size={26}
                variant="Broken"
                color={theme.colors.textOnDark}
              />
            </Box>
          </Pressable>
          <Pressable onPress={() => setAddWorksVisible(!addWorksVisible)}>
            <Box>
              <Box
                backgroundColor="error"
                justifyContent="center"
                alignItems="center"
                borderRadius="xxl"
                width={54}
                height={54}
                marginTop="m"
              >
                <CloseCircle
                  size={26}
                  variant="Broken"
                  color={theme.colors.textOnDark}
                />
              </Box>
            </Box>
          </Pressable>
        </Box>
      )}
      <AddWorksModal
        setModalVisible={setModalVisible}
        visible={modalVisible}
        data={bonsaiData}
        setAddWorksVisible={setAddWorksVisible}
        addWorksVisible={addWorksVisible}
        title="Arbeit hinzufügen"
      />
    </Box>
  );
};

export default WorksView;
