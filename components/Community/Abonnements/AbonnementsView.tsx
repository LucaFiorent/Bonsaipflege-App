import * as React from "react";
import { FC } from "react";
import { FlatList } from "react-native";
import Box from "../../Common/Box";
import Feed from "../../Common/Feed";
import { userStore } from "../../../dataStores/accountStore";
import {
  communityBonsaisStore,
  communityDataStore,
} from "../../../dataStores/communityStore";
import { AbonnementsViewProps } from "../../../sections/CommunitySection";
import theme from "../../../theme/theme";

const AbonnementsView: FC<AbonnementsViewProps> = ({ navigation, route }) => {
  // prepare alternativ title for navigation
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Deine Abonnements",
    });
  }, [navigation]);

  // get data from store
  const userData = userStore();
  const { communityBonsais } = communityBonsaisStore();
  const { communityProfiles } = communityDataStore();

  // prepare data
  const bonsaiElement = communityBonsais.filter((bonsai) =>
    userData.subscribed.includes(bonsai.userId)
  );

  return (
    <>
      <Box marginHorizontal="m" marginTop="l">
        <Box>
          <FlatList
            contentContainerStyle={{
              paddingTop: theme.spacing.m,
              paddingBottom: theme.spacing.xxl,
            }}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={100}
            windowSize={20}
            data={bonsaiElement}
            renderItem={(bonsai) => {
              {
                let userOfBonsai = communityProfiles.filter((profile) => {
                  return (
                    profile.id === bonsai.item.userId &&
                    profile.subscribers.includes(userData.id) &&
                    profile.id !== userData.id
                  );
                });

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
    </>
  );
};

export default AbonnementsView;
