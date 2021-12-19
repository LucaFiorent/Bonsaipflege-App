import * as React from "react";
import db from "../firebase/firebaseConfig";
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const HomeScreen: FC = () => {
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
          entity.createdOn = entity.createdOn.toDate();
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
          entity.createdOn = entity.createdOn.toDate();
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
  const newAktivities = communityBonsais.filter(
    (bonsai) =>
      moment(bonsai.updatedOn).format("D MMM. YY") ===
      moment(today).format("D MMM. YY")
  );

  return (
    <>
      <Box alignItems="center" backgroundColor="primaryGreenColor">
        <Text
          variant="logo"
          marginVertical="m"
          // fontSize={wp(6)}
          // fontFamily="HinaMincho-Regular"
        >
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
                  Wilkommen
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
                    return <Feed key={index} bonsai={item} />;
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
              <Box>
                <Box marginVertical="m">
                  <Text variant="h1">Neue aktivitäten</Text>
                </Box>
                {newAktivities.length === 0 && (
                  <Box
                    flexDirection="row"
                    backgroundColor="mainBackground"
                    paddingVertical="xl"
                    paddingHorizontal="l"
                    alignItems="center"
                    borderRadius="m"
                    marginVertical="xs"
                  >
                    <Like
                      size={40}
                      color={theme.colors.error}
                      variant="Outline"
                    />
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
                )}

                <Box>
                  {communityProfiles.map((userSub, index) => {
                    let latestUpdates = communityBonsais.filter(
                      (bonsai) => bonsai.userId === userSub.id && bonsai
                    );

                    let sortedList = latestUpdates.sort();
                    let today = new Date();

                    let newestBonsais = sortedList.filter((item) => {
                      return (
                        moment(item.updatedOn).format("D MMM. YY") ===
                          moment(today).format("D MMM. YY") && item
                      );
                    });

                    return (
                      userData.subscribed.includes(userSub.id) &&
                      newestBonsais.length !== 0 && (
                        <NewAktivities
                          userSub={userSub}
                          newestBonsais={newestBonsais}
                        />
                      )
                    );
                  })}
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
