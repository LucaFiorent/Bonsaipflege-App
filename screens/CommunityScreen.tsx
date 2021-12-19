import * as React from "react";
import { FC } from "react";
import { FlatList, SafeAreaView, ScrollView } from "react-native";
import Box from "../components/Common/Box";
import Text from "../components/Common/Text";
import Abonnaments from "../components/Community/Abbonaments/Abonnaments";
import Feed from "../components/Common/Feed";
import { userStore } from "../dataStores/accountStore";
import {
  communityBonsaisStore,
  communityDataStore,
} from "../dataStores/communityStore";
import { CommunityScreenProps } from "../sections/CommunitySection";
import theme from "../theme/theme";

const CommunityScreen: FC<CommunityScreenProps> = ({ navigation, route }) => {
  const userData = userStore();

  const { communityBonsais } = communityBonsaisStore();
  const { communityProfiles } = communityDataStore();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Box marginHorizontal="m" marginTop="l">
            {userData.subscribed.length !== 0 && (
              <Abonnaments navigation={navigation} />
            )}

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
