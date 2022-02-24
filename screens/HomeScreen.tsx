import * as React from "react";
import db from "../firebase/firebaseConfig";
import { FC, useEffect, useState } from "react";
import {
  SafeAreaView,
  Image,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
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
import {
  ArrowCircleRight,
  Like,
  SearchNormal1,
  TickCircle,
  Tree,
} from "iconsax-react-native";
import moment from "moment";
import NewAktivities from "../components/Home/NewAktivities/NewAktivities";
import SearchAndFilterBar from "../components/Home/SearchAndFilterBar/SearchAndFilterBar";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import LastWorks from "../components/Home/LastWorks/LastWorks";
import { HomeScreenProps } from "../sections/HomeSection";

const HomeScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  // variables
  const userData = userStore();
  const { myBonsais } = userBonsaisStore();
  const { communityBonsais } = communityBonsaisStore();
  const { communityProfiles } = communityDataStore();

  const [searchBarState, setSearchBarState] = useState(false);
  const [filterOpen, openFilter] = useState(false);

  const [selectedFilters, setselectedFilters] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  // filter logic
  const allFilter = filterData.filter(
    (item) => !selectedFilters.includes(item)
  );
  const setSelectedFilterLogic = (newFilter: string) => {
    if (!selectedFilters.includes(newFilter)) {
      setselectedFilters([...selectedFilters, newFilter]);
    }
  };
  // delete filters for filter logic
  const deleteSelectedFilters = (item: string) => {
    const filter = selectedFilters.filter((item2) => item2 != item);
    setselectedFilters(filter);
  };

  // get public bonsais form db
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
          entity.createdOn = entity.createdOn && entity.createdOn.toDate();
          entity.updatedOn = entity.updatedOn && entity.updatedOn.toDate();
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

  // get bonsais form db
  useEffect(() => {
    const entityRef = db
      .collection("bonsais")
      .where("userId", "==", userData.id);

    entityRef.onSnapshot(
      (querySnapshot: any) => {
        const newEntities: any = [];
        querySnapshot.forEach((doc: any) => {
          const entity = doc.data();
          entity.id = doc.id;
          entity.acquisitionDate = entity.acquisitionDate.toDate();
          entity.createdOn = entity.updatedOn && entity.createdOn.toDate();
          entity.updatedOn = entity.updatedOn && entity.updatedOn.toDate();
          entity.tasks &&
            (entity.tasks = entity.tasks.map((task: any) => ({
              ...task,
              taskDate: task.taskDate.toDate(),
            })));
          newEntities.push(entity);
        });
        userBonsaisStore.setState((state) => ({
          myBonsais: newEntities,
        }));
      },
      (error: any) => {
        console.log(error, "no Bonsais found");
      }
    );
  }, [userData]);

  // filter logic
  let filterResults = communityBonsais;
  if (searchValue) {
    filterResults = communityBonsais.filter(
      (bonsai) =>
        bonsai.form.toLowerCase().includes(searchValue.toLowerCase()) ||
        bonsai.size.toLowerCase().includes(searchValue.toLowerCase()) ||
        bonsai.type.toLowerCase().includes(searchValue.toLowerCase())
    );
  } else if (selectedFilters.length > 0) {
    selectedFilters.map((selectedFilter: string) => {
      filterResults = communityBonsais.filter(
        (bonsai) =>
          bonsai.form.toLowerCase().includes(selectedFilter.toLowerCase()) ||
          bonsai.size.toLowerCase().includes(selectedFilter.toLowerCase()) ||
          bonsai.type.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    });
  } else if (selectedFilters.length > 0) {
    selectedFilters.map((selectedFilter: string) => {
      filterResults = communityBonsais.filter(
        (bonsai) =>
          bonsai.form.toLowerCase().includes(selectedFilter.toLowerCase()) ||
          bonsai.size.toLowerCase().includes(selectedFilter.toLowerCase()) ||
          bonsai.type.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    });
  }
  // prepare data for newAktivitiesComponent
  let today = new Date();
  const newAktivities = communityBonsais.filter((bonsai) => {
    if (
      userData.id !== bonsai.userId &&
      moment(bonsai.updatedOn).format("D MMM. YY") ===
        moment(today).format("D MMM. YY")
    )
      return bonsai;
  });

  // prepare data for newAktivitiesComponent
  const newAktivitiesUser = communityProfiles.filter((profile) => {
    let newBonsai = newAktivities.filter(
      (bonsaiEle) =>
        profile.id === bonsaiEle.userId &&
        bonsaiEle &&
        userData.subscribed.includes(profile.id)
    );
    if (newBonsai.length > 0) return profile.id;
  });

  // prepare newAktivities Component
  const newAktivitiesComponent =
    newAktivitiesUser.length > 0 ? (
      <Box height={wp(30)}>
        <FlatList
          maxToRenderPerBatch={2}
          updateCellsBatchingPeriod={100}
          windowSize={10}
          horizontal
          data={newAktivitiesUser}
          renderItem={(user: any) => {
            return (
              <>
                <NewAktivities
                  userSub={user.item}
                  newestBonsais={newAktivities.filter(
                    (bonsai) => bonsai.userId === user.item.id
                  )}
                  navigation={navigation}
                  route={route}
                />
              </>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </Box>
    ) : (
      // (
      //   newAktivitiesUser.map((user, index) => {
      //     if (userData.subscribed.includes(user.id) && newAktivities.length !== 0)
      //       return (
      //         <Box>
      //           <NewAktivities
      //             key={index}
      //             userSub={user}
      //             newestBonsais={newAktivities.filter(
      //               (bonsai) => bonsai.userId === user.id
      //             )}
      //             navigation={navigation}
      //             route={route}
      //           />
      //         </Box>
      //       );
      //   })
      // )
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
          <Text variant="placeholder" color="error" marginLeft="m">
            Guck später wieder rein
          </Text>
        </Box>
      </Box>
    );

  // prepare data for myLatestWorks
  // const myLatestWorks = myBonsais.filter((bonsai) => {
  //   const lastWork = bonsai.tasks.filter((task) => {
  //     if (
  //       (task.doneTask.includes("Bewässerung") &&
  //         moment(task.taskDate).format("D MMM. YY") ===
  //           moment(today).format("D MMM. YY")) ||
  //       (task.doneTask.includes("Dünger") &&
  //         moment(task.taskDate).format("D MMM. YY") ===
  //           moment(today).format("D MMM. YY"))
  //     )
  //       return task;
  //   });

  //   if (lastWork.length > 0) return bonsai;
  // });

  // sort Bonsai
  let sortBonsai = () => {
    let sorting;
    sorting = myBonsais
      .sort(
        (a, b) =>
          moment(a.updatedOn).format("YYYYMMDD") -
          moment(b.updatedOn).format("YYYYMMDD")
      )
      .reverse();

    return sorting;
  };

  const [sortedBonsai, setSortedBonsai] = useState<any>([]);

  useEffect(() => {
    setSortedBonsai(sortBonsai());
  }, [myBonsais]);

  // prepare myLatestWorks Component
  const myLatestWorksComponent =
    sortedBonsai.length > 0 ? (
      <>
        <Box
          style={
            sortedBonsai.length > 2
              ? { height: wp(83) }
              : sortedBonsai.length > 0
              ? { height: wp(28) }
              : sortedBonsai.length > 1
              ? { height: wp(60) }
              : null
          }
        >
          <FlatList
            maxToRenderPerBatch={3}
            updateCellsBatchingPeriod={100}
            windowSize={10}
            contentContainerStyle={{
              paddingBottom: sortedBonsai.length > 3 ? wp(4) : wp(0),
            }}
            data={sortedBonsai.slice(0, 5)}
            renderItem={(bonsai) => {
              return (
                <LastWorks
                  myLatestWorks={bonsai.item}
                  navigation={navigation}
                  route={route}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </Box>
        {sortedBonsai.length > 3 ? (
          <Box
            alignItems="flex-end"
            position="absolute"
            right={wp(2)}
            bottom={wp(2)}
          >
            <Pressable onPress={() => navigation.navigate("MyScreen")}>
              <Box
                borderColor="primarySalmonColor"
                borderWidth={1}
                alignItems="center"
                flexDirection="row"
                backgroundColor="mainBackground"
                borderRadius="xxl"
                paddingLeft="m"
              >
                <Text
                  variant="inputTitle"
                  color="text"
                  fontSize={wp(3)}
                  marginRight="s"
                >
                  Alle Bonsais
                </Text>
                <Box
                  width={wp(9)}
                  height={wp(9)}
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="primarySalmonColor"
                  borderRadius="xxl"
                >
                  <ArrowCircleRight
                    size={wp(5)}
                    color={theme.colors.textOnDark}
                    variant="Broken"
                  />
                </Box>
              </Box>
            </Pressable>
          </Box>
        ) : null}
      </>
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
        <Tree size={40} color={theme.colors.error} variant="Outline" />
        <Box justifyContent="center">
          <Text variant="placeholder" color="error" marginLeft="m">
            Du hast noch keine arbeiten an
          </Text>
          <Text variant="placeholder" color="error" marginLeft="m">
            deine Bonsais dürchgeführt!
          </Text>
        </Box>
      </Box>
    );

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
            <Pressable onPress={() => navigation.navigate("MyScreen")}>
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
            </Pressable>
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
                    justifyContent="center"
                  >
                    {searchValue || selectedFilters ? (
                      <TickCircle
                        size={wp(4)}
                        color={theme.colors.textOnDark}
                      />
                    ) : null}
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
          {selectedFilters.length > 0 || searchValue !== "" ? (
            <Box>
              <Text marginBottom="l" variant="h1">
                Dein Suchergebnis
              </Text>
              <Box>
                {filterResults.length > 0 ? (
                  <Box
                    height={
                      filterOpen && selectedFilters.length > 0
                        ? wp(75)
                        : filterOpen && selectedFilters.length === 0
                        ? wp(96)
                        : wp(117)
                    }
                  >
                    <FlatList
                      maxToRenderPerBatch={3}
                      updateCellsBatchingPeriod={100}
                      windowSize={10}
                      contentContainerStyle={{
                        paddingBottom: wp(4),
                      }}
                      data={filterResults}
                      renderItem={(item) => {
                        let user = communityProfiles.filter(
                          (user) => item.item.userId === user.id
                        );
                        return (
                          <Feed
                            navigation={navigation}
                            bonsai={item.item}
                            userOfBonsai={user[0]}
                          />
                        );
                      }}
                      keyExtractor={(item) => item.id}
                    />
                  </Box>
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
            </Box>
          ) : (
            <Box marginBottom="xl">
              <Box>
                <Box marginVertical="m">
                  <Text variant="h1">Letzte Arbeiten</Text>
                </Box>
                <Box>{sortedBonsai && myLatestWorksComponent}</Box>
              </Box>
              <Box marginTop="s">
                <Box marginVertical="m" flexDirection="row" alignItems="center">
                  <Text variant="h1">Heutige Aktivitäten</Text>
                </Box>
                <Box>{newAktivities && newAktivitiesComponent}</Box>
              </Box>
            </Box>
          )}
        </Box>
      </SafeAreaView>
    </>
  );
};
export default HomeScreen;
