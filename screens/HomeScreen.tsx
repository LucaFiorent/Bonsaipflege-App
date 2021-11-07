import * as React from "react";
import { FC, useEffect, useState } from "react";
import { SafeAreaView, Image, ScrollView } from "react-native";
import Box from "../components/Common/Box";
import Text from "../components/Common/Text";
import Search from "../components/Common/Search";
import { userStore } from "../dataStores/accountStore";
import theme from "../theme/theme";
import Feed from "../components/Home/Community/Feed";
import db from "../firebase/firebaseConfig";
import { communityData } from "../dataStores/CommunityStore";

const HomeScreen: FC = () => {
  const userData = userStore();
  const [communityProfiles, setAllCommunityProfiles] = useState<
    communityData[]
  >([]);
  const [allBonsais, setAllBonsais] = useState([]);
  const [myBonsais, getMyBonsais] = useState([]);

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
        getMyBonsais(newEntities);
      },
      (error: any) => {
        console.log(error, "no Bonsais found");
      }
    );
  }, []);
  console.log("my Bonsais: ", myBonsais);
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

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.mainBackground }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 64 }}>
        <Box
          flex={1}
          flexDirection="row"
          alignItems="center"
          marginVertical="l"
          marginHorizontal="m"
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
        <Search searchValue="" searchTrick={() => null} placeholder="lol" />
        <Box marginHorizontal="m">
          <Text marginBottom="l" variant="h1">
            Feed
          </Text>
          {/* <FlatList
            contentContainerStyle={{
              paddingTop: theme.spacing.m,
              paddingBottom: theme.spacing.xxl,
            }}
            data={communityProfiles.bonsais}
            renderItem={({ item }) => (
              <Feed item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.name}
          /> */}
          <Feed />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
