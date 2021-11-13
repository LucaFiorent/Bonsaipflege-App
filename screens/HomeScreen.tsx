import * as React from "react";
import db, { firebaseConfig } from "../firebase/firebaseConfig";
import firebase from "firebase";
import { FC, useEffect, useState } from "react";
import { SafeAreaView, Image, ScrollView, Pressable } from "react-native";
import Box from "../components/Common/Box";
import Text from "../components/Common/Text";
import Search from "../components/Common/Search";
import { userBonsaisStore, userStore } from "../dataStores/accountStore";
import theme from "../theme/theme";
import Feed from "../components/Home/Community/Feed";
import { communityData } from "../dataStores/CommunityStore";
import { FlatList } from "react-native-gesture-handler";
import create from "zustand";
import { SimpleLineIcons } from "@expo/vector-icons";

import { filterData } from "../data/bonsaiFilter";
import FilterCards from "../components/Home/Community/FilterCards";

const HomeScreen: FC = () => {
  const userData = userStore();
  const [communityProfiles, setAllCommunityProfiles] = useState<
    communityData[]
  >([]);

  const { myBonsais } = userBonsaisStore();
  const [selectedFilter, setFilterData] = useState("");

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

  // userBonsais.forEach((item) => console.log(item)  )
  // communityProfiles.forEach((element) => {
  //   console.log(element.bonsais);
  //   element.bonsais.forEach((bonsai) => {
  //     console.log(bonsai);
  //   });
  // });

  useEffect(() => {
    const entityRef = db.collection("userData");

    entityRef.onSnapshot(
      (querySnapshot: any) => {
        const newEntities: any = [];
        querySnapshot.forEach((doc: any) => {
          const entity = doc.data();
          entity.id = doc.id;
          newEntities.push(entity);
        });
        setAllCommunityProfiles(newEntities);
      },
      (error: any) => {
        console.log(error, "no persons found");
      }
    );
  }, []);

  console.log("sel ", selectedFilter);

  const filterResults: any = selectedFilter
    ? myBonsais.filter(
        (bonsai) =>
          bonsai.form.toLowerCase().includes(selectedFilter.toLowerCase()) ||
          bonsai.size.toLowerCase().includes(selectedFilter.toLowerCase()) ||
          bonsai.type.toLowerCase().includes(selectedFilter.toLowerCase())
      )
    : null;

  console.log(filterResults);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.mainBackground,
        marginBottom: 95,
      }}
    >
      <Box paddingHorizontal="m" backgroundColor="mainBackground">
        <Box marginVertical="m">
          <Search searchValue="" searchTrick={() => null} placeholder="lol" />
        </Box>
        <ScrollView>
          <Box
            flex={1}
            flexDirection="row"
            alignItems="center"
            marginVertical="l"
          >
            <Box alignItems="center">
              <Box alignItems="center">
                <Image
                  source={
                    userData.avatar === ""
                      ? require("../assets/images/programmer.png")
                      : { uri: userData.avatar }
                  }
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: theme.borderRadii.xxl,
                  }}
                />
              </Box>
            </Box>
            <Box marginLeft="xl">
              <Text fontSize={18} marginVertical="xs" textTransform="uppercase">
                {userData.nickname}
              </Text>
            </Box>
          </Box>

          <Box>
            <Text marginBottom="l" variant="h1">
              Deine Bonsais
            </Text>
            {myBonsais.map((item) => {
              return <Feed bonsai={item} />;
            })}
          </Box>
          <Box marginBottom="xl">
            <Box flexDirection="row" alignItems="center" marginBottom="l">
              <SimpleLineIcons
                name="equalizer"
                size={24}
                color={theme.colors.headline}
              />
              <Text marginLeft="m" variant="h1">
                Filter
              </Text>
            </Box>
            <Box
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {filterData.map((item) => {
                return (
                  <FilterCards
                    selectedFilter={selectedFilter}
                    filterItem={item}
                    filterOnPress={setFilterData}
                  />
                );
              })}
            </Box>
          </Box>
          <Box>
            <Text marginBottom="l" variant="h1">
              Feed
            </Text>
            {!filterResults
              ? myBonsais.map((item) => {
                  return <Feed bonsai={item} />;
                })
              : filterResults.map((item) => {
                  return <Feed bonsai={item} />;
                })}
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
export default HomeScreen;
