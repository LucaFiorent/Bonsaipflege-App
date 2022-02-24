import * as React from "react";
import { FC } from "react";
import { FlatList, SafeAreaView } from "react-native";
import Box from "../components/Common/Box";
import Text from "../components/Common/Text";
import Abonnements from "../components/Community/Abonnements/Abonnements";
import Feed from "../components/Common/Feed";
import { userStore } from "../dataStores/accountStore";
import {
  communityBonsaisStore,
  communityDataStore,
} from "../dataStores/communityStore";
import { CommunityScreenProps } from "../sections/CommunitySection";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CommunityScreen: FC<CommunityScreenProps> = ({ navigation, route }) => {
  const userData = userStore();

  const { communityBonsais } = communityBonsaisStore();
  const { communityProfiles } = communityDataStore();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Box marginHorizontal="m" marginTop="l">
          {userData.subscribed.length !== 0 && (
            <Abonnements navigation={navigation} />
          )}

          <Box>
            <Text marginTop="l" marginBottom="m" variant="h1">
              Feed
            </Text>
            <Box
              style={
                userData.subscribed.length !== 0
                  ? { marginBottom: hp(48.2) }
                  : { marginBottom: hp(23) }
              }
            >
              <FlatList
                maxToRenderPerBatch={5}
                updateCellsBatchingPeriod={100}
                windowSize={20}
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
      </SafeAreaView>
    </>
  );
};

export default CommunityScreen;
