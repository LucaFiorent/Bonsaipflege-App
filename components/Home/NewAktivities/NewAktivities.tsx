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
    <Box marginRight="l">
      <Pressable
        onPress={() =>
          navigation.navigate("CommunityUserProfileView", {
            userOfBonsai: userSub,
          })
        }
      >
        <Box
          width={wp(55)}
          flexDirection="row"
          backgroundColor="mainBackground"
          padding="xs"
          alignItems="center"
          borderRadius="xxl"
          marginVertical="xs"
          justifyContent="space-between"
        >
          <Box flex={3} flexDirection="row" alignItems="center" zIndex={2}>
            <Image
              source={
                userSub.avatar === ""
                  ? require("../../../assets/images/programmer.png")
                  : { uri: userSub.avatar }
              }
              style={{
                width: wp(15),
                height: wp(15),
                borderRadius: theme.borderRadii.xxl,
              }}
            />
            <Box borderRadius="xxl" paddingHorizontal="s">
              <Text
                variant="title"
                marginVertical="xs"
                color="headline"
                fontSize={wp(3)}
              >
                {userSub.nickname.length > 11
                  ? userSub.nickname.slice(0, 11) + ".."
                  : userSub.nickname}
              </Text>
            </Box>
          </Box>
          <Box flex={1} alignItems="center">
            <Text variant="title" color="headline" marginHorizontal="s">
              +{newestBonsais.length}
            </Text>
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};

export default NewAktivities;
