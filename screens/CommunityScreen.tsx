import { ArrowCircleRight } from "iconsax-react-native";
import * as React from "react";
import { FC, useEffect } from "react";
import { FlatList, SafeAreaView, ScrollView, Image } from "react-native";
import Box from "../components/Common/Box";
import Text from "../components/Common/Text";
import Feed from "../components/Home/Community/Feed";
import { userBonsaisStore, userStore } from "../dataStores/accountStore";
import {
  communityBonsaisStore,
  communityDataStore,
} from "../dataStores/communityStore";
import db from "../firebase/firebaseConfig";
import { CommunityScreenProps } from "../sections/CommunitySection";
import theme from "../theme/theme";

const CommunityScreen: FC<CommunityScreenProps> = ({ navigation, route }) => {
  const { myBonsais } = userBonsaisStore();
  const userData = userStore();
  // const [communityBonsais, setAllCommunityProfiles] = useState<
  //   communityData[]
  // >([]);
  const { communityBonsais } = communityBonsaisStore();
  const { communityProfiles } = communityDataStore();

  useEffect(() => {
    const entityRef = db
      .collection("bonsais")
      .where("publicBonsai", "==", true);
    entityRef.onSnapshot(
      (querySnapshot: any) => {
        const newEntities: any = [];
        querySnapshot.forEach((doc: any) => {
          const entity = doc.data();
          entity.id = doc.id;
          entity.acquisitionDate = entity.acquisitionDate.toDate();
          entity.tasks &&
            (entity.tasks = entity.tasks.map((task: any) => ({
              ...task,
              taskDate: task.taskDate.toDate(),
            })));
          newEntities.push(entity);
        });

        communityBonsaisStore.setState((state) => ({
          communityBonsais: newEntities,
        }));
      },
      (error: any) => {
        console.log(error, "no Communitty Bonsais found");
      }
    );

    const communityUserData = db.collection("userData");

    communityUserData.onSnapshot(
      (querySnapshot: any) => {
        const newCommunityEntities: any = [];
        querySnapshot.forEach((doc: any) => {
          const entity = doc.data();

          newCommunityEntities.push(entity);
        });
        communityDataStore.setState((state) => ({
          communityProfiles: newCommunityEntities,
        }));
      },
      (error: any) => {
        console.log(error, "no Community Data found");
      }
    );
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Box marginHorizontal="m" marginTop="l">
            <Box>
              <Box>
                <Text marginBottom="s" variant="h1">
                  Deine Abbonaments
                </Text>
              </Box>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                backgroundColor="mainBackground"
                padding="m"
                borderRadius="xxl"
              >
                <Box flexDirection="row" alignItems="center">
                  <Box flexDirection="row">
                    {userData.subscribed.map((subscribedUser) => (
                      <Box
                        style={{ marginRight: -10 }}
                        backgroundColor="primaryGreenColor"
                        borderRadius="xxl"
                      >
                        <Image
                          source={require("../assets/images/programmer.png")}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: theme.borderRadii.xxl,
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                  <Box>
                    <Text
                      variant="inputTitle"
                      color="textHighContrast"
                      fontSize={20}
                      marginLeft="m"
                    >
                      +{userData.subscribed.length}
                    </Text>
                  </Box>
                </Box>
                <Box flexDirection="row" alignItems="center">
                  <Box>
                    <Text marginRight="s">zu den Bonsais</Text>
                  </Box>
                  <Box>
                    <ArrowCircleRight
                      size="32"
                      color={theme.colors.primarySalmonColor}
                      variant="Broken"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              <Text marginTop="l" marginBottom="m" variant="h1">
                Feed
              </Text>
              <Box>
                <FlatList
                  contentContainerStyle={{
                    paddingTop: theme.spacing.m,
                    paddingBottom: theme.spacing.xxl,
                  }}
                  // removeClippedSubviews={true}
                  // initialNumToRender={5}
                  // maxToRenderPerBatch={5}
                  // updateCellsBatchingPeriod={100}
                  // windowSize={20}
                  data={communityBonsais}
                  renderItem={(bonsai) => {
                    {
                      let userOfBonsai = communityProfiles.filter(
                        (profile) => profile.id === bonsai.item.userId
                      );
                      return (
                        <Feed
                          navigation={navigation}
                          bonsai={bonsai.item}
                          userOfBonsai={userOfBonsai[0]}
                          key={bonsai.item.id}
                          route={route}
                        />
                      );
                    }
                  }}
                  keyExtractor={(item) => item.id}
                />
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CommunityScreen;
