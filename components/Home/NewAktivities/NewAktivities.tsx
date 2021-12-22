import * as React from "react";
import { FC } from "react";
import Box from "../../../components/Common/Box";
import Text from "../../../components/Common/Text";
import theme from "../../../theme/theme";
import { Image, Pressable } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type NewAktivitiesProps = {
  userSub: any;
  newestBonsais: any;
  navigation: any;
  route: any;
};

const NewAktivities: FC<NewAktivitiesProps> = ({
  userSub,
  newestBonsais,
  navigation,
  route,
}) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("CommunityUserProfileView", {
          userOfBonsai: userSub,
        })
      }
    >
      <Box
        flexDirection="row"
        backgroundColor="mainBackground"
        padding="xs"
        alignItems="center"
        borderRadius="xxl"
        marginVertical="xs"
        justifyContent="space-between"
      >
        <Box flex={3} flexDirection="row" alignItems="center">
          <Image
            source={
              userSub.avatar === ""
                ? require("../../../assets/images/programmer.png")
                : { uri: userSub.avatar }
            }
            style={{
              width: wp(20),
              height: wp(20),
              borderRadius: theme.borderRadii.xxl,
            }}
          />
          <Box marginLeft="m">
            <Text variant="title" marginVertical="xs" color="headline">
              {userSub.nickname}
            </Text>
          </Box>
        </Box>
        <Box flex={1} alignItems="center">
          <Text variant="title" color="headline">
            +{newestBonsais.length}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default NewAktivities;
