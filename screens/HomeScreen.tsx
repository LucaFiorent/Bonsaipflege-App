import * as React from "react";
import db from "../firebase/firebaseConfig";
import { FC, useEffect, useState } from "react";
import { SafeAreaView, Image, ScrollView, Pressable } from "react-native";
import Box from "../components/Common/Box";
import Text from "../components/Common/Text";
import Search from "../components/Common/Search";
import { userBonsaisStore, userStore } from "../dataStores/accountStore";
import theme from "../theme/theme";
import Feed from "../components/Home/Community/Feed";
import { SimpleLineIcons } from "@expo/vector-icons";

import { filterData } from "../data/bonsaiData";
import FilterCards from "../components/Home/Community/FilterCards";

const HomeScreen: FC = () => {
  const userData = userStore();

  const [searchBarState, setSearchBarState] = useState(false);
  const [filterOpen, openFilter] = useState(false);

  const { myBonsais } = userBonsaisStore();

  const [selectedFilters, setselectedFilters] = useState([]);

  const allFilter = filterData.filter(
    (item) => !selectedFilters.includes(item)
  );

  const [searchValue, setSearchValue] = useState("");

  const setSelectedFilterLogic = (newFilter) => {
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
      .where("userId", "==", userData.id);

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
        userBonsaisStore.setState((state) => ({
          myBonsais: newEntities,
        }));
      },
      (error: any) => {
        console.log(error, "no Bonsais found");
      }
    );
  }, [userData]);

  let filterResults = myBonsais;
  //console.log(myBonsais);

  if (searchValue) {
    filterResults = myBonsais.filter(
      (bonsai) =>
        bonsai.form.toLowerCase().includes(searchValue.toLowerCase()) ||
        bonsai.size.toLowerCase().includes(searchValue.toLowerCase()) ||
        bonsai.type.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (selectedFilters.length > 0) {
      selectedFilters.map((selectedFilter) => {
        filterResults = myBonsais.filter(
          (bonsai) =>
            bonsai.form.toLowerCase().includes(selectedFilter.toLowerCase()) ||
            bonsai.size.toLowerCase().includes(selectedFilter.toLowerCase()) ||
            bonsai.type.toLowerCase().includes(selectedFilter.toLowerCase())
        );
      });
    }
  } else if (selectedFilters.length > 0) {
    selectedFilters.map((selectedFilter) => {
      filterResults = myBonsais.filter(
        (bonsai) =>
          bonsai.form.toLowerCase().includes(selectedFilter.toLowerCase()) ||
          bonsai.size.toLowerCase().includes(selectedFilter.toLowerCase()) ||
          bonsai.type.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    });
  }

  return (
    <>
      <Box alignItems="center" backgroundColor="primaryGreenColor">
        <Text marginVertical="m" fontSize={20} fontFamily="HinaMincho-Regular">
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
                    width: 50,
                    height: 50,
                    borderRadius: theme.borderRadii.xxl,
                  }}
                />
              </Box>
              <Box marginLeft="l">
                <Text
                  fontSize={18}
                  textTransform="uppercase"
                  variant="title"
                  color="headline"
                >
                  Wilkommen
                </Text>
                <Text
                  fontSize={18}
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
                paddingHorizontal="ms"
                paddingVertical="ms"
                borderRadius="l"
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
                  >
                    <Text
                      variant="title"
                      fontSize={12}
                      color="textOnDark"
                      paddingVertical="xxs"
                      paddingHorizontal="s"
                    >
                      {searchValue || selectedFilters ? "+" : null}
                    </Text>
                  </Box>
                ) : null}
                <SimpleLineIcons
                  name="magnifier"
                  size={24}
                  color={
                    searchBarState
                      ? theme.colors.primaryGreenColor
                      : theme.colors.iconInactive
                  }
                />
              </Box>
            </Pressable>
          </Box>
          {searchBarState && (
            <Box>
              <Box
                marginVertical="s"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Search
                  primaryBg={true}
                  searchValue={searchValue}
                  searchTrick={setSearchValue}
                  placeholder="Suche nach Bonsais..."
                />
                <Pressable onPress={() => openFilter(!filterOpen)}>
                  <Box
                    marginLeft="m"
                    paddingHorizontal="ms"
                    paddingVertical="ms"
                    borderRadius="xxl"
                    backgroundColor="mainBackground"
                    borderWidth={1}
                    borderColor={
                      filterOpen ? "primaryGreenColor" : "iconInactive"
                    }
                  >
                    {selectedFilters.length > 0 ? (
                      <Box
                        position="absolute"
                        right={-5}
                        top={-5}
                        borderRadius="xl"
                        backgroundColor="error"
                      >
                        <Text
                          variant="title"
                          fontSize={12}
                          color="textOnDark"
                          paddingVertical="xxs"
                          paddingHorizontal="s"
                        >
                          {searchValue || selectedFilters ? "+" : null}
                        </Text>
                      </Box>
                    ) : null}
                    <SimpleLineIcons
                      name="equalizer"
                      size={23}
                      color={
                        filterOpen
                          ? theme.colors.primaryGreenColor
                          : theme.colors.iconInactive
                      }
                    />
                  </Box>
                </Pressable>
              </Box>
              <Box
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="flex-start"
                marginBottom="s"
              >
                {filterOpen &&
                  allFilter.map((item, index) => {
                    return (
                      <Box marginRight="s">
                        <FilterCards
                          key={filterData.indexOf(item.id)}
                          selectedFilters={selectedFilters}
                          filterItem={item}
                          filterOnPress={setSelectedFilterLogic}
                        />
                      </Box>
                    );
                  })}
              </Box>
              {filterOpen && selectedFilters.length > 0 && (
                <Box>
                  <Text variant="inputTitle" color="text" marginBottom="ms">
                    Ausgewählte Filter
                  </Text>
                  <Box
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="flex-start"
                    marginBottom="s"
                  >
                    {selectedFilters.length > 0
                      ? selectedFilters.map((item) => {
                          return (
                            <Box marginRight="s">
                              <FilterCards
                                selectedFilters={selectedFilters}
                                filterItem={item}
                                filterOnPress={deleteSelectedFilters}
                                key={filterData.indexOf(item.id)}
                              />
                            </Box>
                          );
                        })
                      : null}
                  </Box>
                </Box>
              )}
            </Box>
          )}
          <ScrollView>
            {selectedFilters.length > 0 || searchValue ? (
              <Box>
                <Text marginBottom="l" variant="h1">
                  Dein Suchergebnis
                </Text>
                {filterResults.length > 0 ? (
                  filterResults.map((item) => {
                    return <Feed bonsai={item} />;
                  })
                ) : (
                  <Box justifyContent="center" alignItems="center">
                    <Image
                      source={require("../assets/images/bonsai.jpg")}
                      style={{
                        width: 100,
                        height: 100,
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
                {/* <Text marginBottom="l" variant="h1">
                  Deine Bonsais
                </Text>
                {filterResults.map((item) => {
                  return <Feed bonsai={item} key={item.id} />;
                })}
                <Box>
                  <Text marginBottom="l" variant="h1">
                    Feed
                  </Text>
                  {myBonsais.map((item) => {
                    return <Feed bonsai={item} key={item.id} />;
                  })}
                </Box> */}
              </Box>
            )}
          </ScrollView>
        </Box>
      </SafeAreaView>
    </>
  );
};
export default HomeScreen;
