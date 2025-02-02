import * as React from "react";
import { FC, useEffect, useState } from "react";
import { SafeAreaView, Image, ScrollView, Pressable } from "react-native";
import Box from "../components/Common/Box";
import Text from "../components/Common/Text";
import { userBonsaisStore, userStore } from "../dataStores/accountStore";
import theme from "../theme/theme";
import Feed from "../components/Common/Feed";

import { filterData } from "../data/bonsaiData";
import {
  communityBonsaisStore,
  communityDataStore,
} from "../dataStores/communityStore";
import { Like, SearchNormal1 } from "iconsax-react-native";
import moment from "moment";
import NewAktivities from "../components/Home/NewAktivities/NewAktivities";
import SearchAndFilterBar from "../components/Home/SearchAndFilterBar/SearchAndFilterBar";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import LastWorks from "../components/Home/LastWorks/LastWorks";
import { HomeScreenProps } from "../sections/HomeSection";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const HomeScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const userData = userStore();
  const { myBonsais } = userBonsaisStore();
  const { communityBonsais } = communityBonsaisStore();
  const { communityProfiles } = communityDataStore();

  const [searchBarState, setSearchBarState] = useState(false);
  const [filterOpen, openFilter] = useState(false);

  const [selectedFilters, setselectedFilters] = useState<string[]>([]);

  const allFilter = filterData.filter(
    (item) => !selectedFilters.includes(item)
  );

  const [searchValue, setSearchValue] = useState("");

  const setSelectedFilterLogic = (newFilter: string) => {
    if (!selectedFilters.includes(newFilter)) {
      setselectedFilters([...selectedFilters, newFilter]);
    }
  };

  const deleteSelectedFilters = (item: string) => {
    const filter = selectedFilters.filter((item2) => item2 != item);
    setselectedFilters(filter);
  };

  useEffect(() => {
    // Create a reference to the "bonsais" collection
    const bonsaisRef = collection(db, "bonsais");

    // Create the query for public bonsais
    const entityQuery = query(bonsaisRef, where("publicBonsai", "==", true));

    // Real-time listener for the snapshot
    const unsubscribeBonsais = onSnapshot(
      entityQuery,
      (querySnapshot) => {
        const newEntities: any = [];
        querySnapshot.forEach((doc) => {
          const entity = doc.data();
          entity.id = doc.id;
          entity.acquisitionDate = entity.acquisitionDate.toDate();
          entity.createdOn = entity.createdOn.toDate();
          entity.updatedOn = entity.updatedOn
            ? entity.updatedOn.toDate()
            : null;

          // Convert task dates if they exist
          if (entity.tasks) {
            entity.tasks = entity.tasks.map((task: any) => ({
              ...task,
              taskDate: task.taskDate.toDate(),
            }));
          }

          newEntities.push(entity);
        });

        // Update the state with the new entities
        communityBonsaisStore.setState((state) => ({
          communityBonsais: newEntities,
        }));
      },
      (error) => {
        console.log(error, "No Community Bonsais found");
      }
    );

    // Query for community user data
    const userDataRef = collection(db, "userData");

    // Listen for real-time updates on userData collection
    const unsubscribeCommunityData = onSnapshot(
      userDataRef,
      (querySnapshot) => {
        const newCommunityEntities: any = [];
        querySnapshot.forEach((doc) => {
          const entity = doc.data();
          newCommunityEntities.push(entity);
        });

        // Update community data store with new profiles
        communityDataStore.setState((state) => ({
          communityProfiles: newCommunityEntities,
        }));
      },
      (error) => {
        console.log(error, "No Community Data found");
      }
    );

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeBonsais();
      unsubscribeCommunityData();
    };
  }, [db]);

  useEffect(() => {
    // Ensure userData.id is available before querying
    if (!userData.id) return;

    // Reference to the "bonsais" collection
    const bonsaisRef = collection(db, "bonsais");

    // Create a query to fetch bonsais based on the user's ID
    const entityQuery = query(bonsaisRef, where("userId", "==", userData.id));

    // Real-time listener for the snapshot
    const unsubscribe = onSnapshot(
      entityQuery,
      (querySnapshot) => {
        const newEntities: any = [];
        querySnapshot.forEach((doc) => {
          const entity = doc.data();
          entity.id = doc.id;
          entity.acquisitionDate = entity.acquisitionDate.toDate();
          entity.createdOn = entity.createdOn.toDate();
          entity.updatedOn = entity.updatedOn
            ? entity.updatedOn.toDate()
            : null;

          // Convert task dates if they exist
          if (entity.tasks) {
            entity.tasks = entity.tasks.map((task: any) => ({
              ...task,
              taskDate: task.taskDate.toDate(),
            }));
          }

          newEntities.push(entity);
        });

        // Update the state with the new entities
        userBonsaisStore.setState((state) => ({
          myBonsais: newEntities,
        }));
      },
      (error) => {
        console.log(error, "No Bonsais found");
      }
    );

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [userData]);

  let filterResults = communityBonsais;
  if (searchValue) {
    filterResults = communityBonsais.filter(
      (bonsai) =>
        bonsai.form.toLowerCase().includes(searchValue.toLowerCase()) ||
        bonsai.size.toLowerCase().includes(searchValue.toLowerCase()) ||
        bonsai.type.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (selectedFilters.length > 0) {
      selectedFilters.map((selectedFilter: string) => {
        filterResults = communityBonsais.filter(
          (bonsai) =>
            bonsai.form.toLowerCase().includes(selectedFilter.toLowerCase()) ||
            bonsai.size.toLowerCase().includes(selectedFilter.toLowerCase()) ||
            bonsai.type.toLowerCase().includes(selectedFilter.toLowerCase())
        );
      });
    }
  } else if (selectedFilters.length > 0) {
    selectedFilters.map((selectedFilter: string) => {
      filterResults = myBonsais.filter(
        (bonsai) =>
          bonsai.form.toLowerCase().includes(selectedFilter.toLowerCase()) ||
          bonsai.size.toLowerCase().includes(selectedFilter.toLowerCase()) ||
          bonsai.type.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    });
  }

  let today = new Date();
  const newAktivities = communityBonsais.filter((bonsai) => {
    if (
      userData.id !== bonsai.userId &&
      moment(bonsai.updatedOn).format("D MMM. YY") ===
        moment(today).format("D MMM. YY")
    )
      return bonsai;
  });

  const newAktivitiesUser = communityProfiles.filter((profile) => {
    let newBonsai = newAktivities.filter(
      (bonsaiEle) => profile.id === bonsaiEle.userId && bonsaiEle
    );
    if (newBonsai.length > 0) return profile.id;
  });

  const newAktivitiesComponent =
    newAktivities.length > 0 ? (
      newAktivitiesUser.map((user, index) => {
        if (userData.subscribed.includes(user.id) && newAktivities.length !== 0)
          return (
            <Box>
              <NewAktivities
                key={index}
                userSub={user}
                newestBonsais={newAktivities.filter(
                  (bonsai) => bonsai.userId === user.id
                )}
                navigation={navigation}
                route={route}
              />
            </Box>
          );
      })
    ) : (
      <Box
        flexDirection="row"
        backgroundColor="mainBackground"
        paddingVertical="xl"
        paddingHorizontal="l"
        alignItems="center"
        borderRadius="m"
        marginVertical="xs"
      >
        <Like size={40} color={theme.colors.error} variant="Outline" />
        <Box justifyContent="center">
          <Text variant="placeholder" color="error" marginLeft="m">
            Es gibt keine neuen Aktivitäten heute
          </Text>
          <Text
            variant="placeholder"
            color="error"
            marginLeft="m"
            fontSize={14}
          >
            Gück wieder später rein
          </Text>
        </Box>
      </Box>
    );

  const myLatestWorks = myBonsais.filter((bonsai) => {
    const lastWork = bonsai.tasks.filter((task) => {
      if (
        (task.doneTask.includes("Bewässerung") &&
          moment(task.taskDate).format("D MMM. YY") ===
            moment(today).format("D MMM. YY")) ||
        (task.doneTask.includes("Dünger") &&
          moment(task.taskDate).format("D MMM. YY") ===
            moment(today).format("D MMM. YY"))
      )
        return task;
    });

    if (lastWork.length > 0) return bonsai;
  });

  const myLatestWorksComponent =
    myLatestWorks.length > 0 &&
    myLatestWorks.map((bonsai, index) => {
      return (
        <Box>
          <LastWorks
            key={index}
            myLatestWorks={bonsai}
            navigation={navigation}
            route={route}
          />
        </Box>
      );
    });

  return (
    <>
      <Box alignItems="center" backgroundColor="primaryGreenColor">
        <Text variant="logo" marginVertical="m">
          BONSAI
        </Text>
      </Box>
      <SafeAreaView
        style={{
          flex: 1,
          marginBottom: 95,
        }}
      >
        <Box paddingHorizontal="m">
          <Box
            flexDirection="row"
            alignItems="center"
            marginTop="l"
            marginBottom={searchBarState ? "xxs" : "l"}
            justifyContent="space-between"
          >
            <Box flexDirection="row" alignItems="center">
              <Box alignItems="center">
                <Image
                  source={
                    userData.avatar === ""
                      ? require("../assets/images/programmer.png")
                      : { uri: userData.avatar }
                  }
                  style={{
                    width: wp(14),
                    height: wp(14),
                    borderRadius: theme.borderRadii.xxl,
                  }}
                />
              </Box>
              <Box marginLeft="l">
                <Text
                  fontSize={wp(4.5)}
                  textTransform="uppercase"
                  variant="title"
                  color="headline"
                >
                  Willkommen
                </Text>
                <Text
                  fontSize={wp(4.5)}
                  textTransform="uppercase"
                  variant="title"
                  color="headline"
                >
                  {userData.nickname}
                </Text>
              </Box>
            </Box>
            <Pressable
              onPress={() => {
                setSearchBarState(!searchBarState), openFilter(false);
              }}
            >
              <Box
                width={wp(12)}
                height={wp(12)}
                alignItems="center"
                justifyContent="center"
                borderRadius="xxl"
                backgroundColor="mainBackground"
                borderWidth={1}
                borderColor={
                  searchBarState ? "primaryGreenColor" : "iconInactive"
                }
              >
                {searchValue || selectedFilters.length > 0 ? (
                  <Box
                    position="absolute"
                    right={-5}
                    top={-5}
                    borderRadius="xl"
                    backgroundColor="error"
                    width={wp(5)}
                    height={wp(5)}
                    alignItems="center"
                  >
                    <Text variant="title" fontSize={wp(3.5)} color="textOnDark">
                      {searchValue || selectedFilters ? "+" : null}
                    </Text>
                  </Box>
                ) : null}
                <SearchNormal1
                  size={wp(6.5)}
                  color={
                    searchBarState
                      ? theme.colors.primaryGreenColor
                      : theme.colors.textHighContrast
                  }
                  variant="Broken"
                />
              </Box>
            </Pressable>
          </Box>
          <Box>
            {searchBarState && (
              <SearchAndFilterBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                openFilter={openFilter}
                filterOpen={filterOpen}
                selectedFilters={selectedFilters}
                allFilter={allFilter}
                deleteSelectedFilters={deleteSelectedFilters}
                setSelectedFilterLogic={setSelectedFilterLogic}
              />
            )}
          </Box>

          <ScrollView>
            {selectedFilters.length > 0 || searchValue !== "" ? (
              <Box>
                <Text marginBottom="l" variant="h1">
                  Dein Suchergebnis
                </Text>
                {filterResults.length > 0 ? (
                  filterResults.map((item, index) => {
                    let user = communityProfiles.filter(
                      (user) => item.userId === user.id
                    );

                    return (
                      <>
                        <Feed
                          key={index}
                          bonsai={item}
                          userOfBonsai={user[0]}
                        />
                      </>
                    );
                  })
                ) : (
                  <Box justifyContent="center" alignItems="center">
                    <Image
                      source={require("../assets/images/bonsai.jpg")}
                      style={{
                        width: wp(23),
                        height: wp(23),
                        borderRadius: theme.borderRadii.xxl,
                      }}
                    />
                    <Text variant="placeholder" color="error">
                      Keine Bonsais gefunden
                    </Text>
                  </Box>
                )}
              </Box>
            ) : (
              <Box marginBottom="xl">
                <Box>
                  <Box marginVertical="m">
                    <Text variant="h1">Letze Arbeiten</Text>
                  </Box>
                  <Box>{myLatestWorks && myLatestWorksComponent}</Box>
                </Box>
                <Box>
                  <Box marginVertical="m">
                    <Text variant="h1">Neue aktivitäten</Text>
                  </Box>
                  <Box>{newAktivities && newAktivitiesComponent}</Box>
                </Box>
              </Box>
            )}
          </ScrollView>
        </Box>
      </SafeAreaView>
    </>
  );
};
export default HomeScreen;
