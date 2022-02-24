import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Box from "../../components/Common/Box";
import theme from "../../theme/theme";
import ProfileInfos from "../../components/MyScreen/Profile/ProfileInfos";
import { FC } from "react";
import MyBonsais from "../../components/Common/MyBonsais";
import { CommunityUserProfileViewProps } from "../../sections/CommunitySection";
import { communityBonsaisStore } from "../../dataStores/communityStore";

const CommunityUserProfileView: FC<CommunityUserProfileViewProps> = ({
  navigation,
  route,
}) => {
  // prepare alternative title for navigation
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Profil von " + userOfSelectedBonsai.nickname,
    });
  }, [navigation]);

  // get data from store
  const { communityBonsais } = communityBonsaisStore();
  // get data passes from route like params
  const userOfSelectedBonsai = route.params.userOfBonsai;
  // prepare data for use
  const bonsaisOfSelUsr = communityBonsais.filter(
    (bonsai) => bonsai.userId === userOfSelectedBonsai.id
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1, marginHorizontal: theme.spacing.m }}>
        <ScrollView>
          <Box>
            <ProfileInfos
              user={userOfSelectedBonsai}
              bonsais={bonsaisOfSelUsr.length}
            />
          </Box>
          <Box marginBottom="xl">
            {bonsaisOfSelUsr &&
              bonsaisOfSelUsr.map((bonsai) => {
                return (
                  <MyBonsais
                    key={bonsai.id}
                    bonsaiData={bonsai}
                    navigation={navigation}
                    user={userOfSelectedBonsai}
                  />
                );
              })}
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CommunityUserProfileView;
