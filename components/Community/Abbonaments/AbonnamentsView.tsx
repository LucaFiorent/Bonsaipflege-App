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
import { AbonnamentsViewProps } from "../../../sections/CommunitySection";
import theme from "../../../theme/theme";

const AbonnamentsView: FC<AbonnamentsViewProps> = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Deine Abonnaments",
    });
  }, [navigation]);

  const userData = userStore();
  const { communityBonsais } = communityBonsaisStore();
  const { communityProfiles } = communityDataStore();

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

export default AbonnamentsView;
