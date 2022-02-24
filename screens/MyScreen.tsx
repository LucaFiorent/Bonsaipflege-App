import * as React from "react";
import { FlatList, SafeAreaView, Image } from "react-native";
import theme from "../theme/theme";
import ProfileInfos from "../components/MyScreen/Profile/ProfileInfos";
import NextStepButton from "../components/Common/NextStepButton";
import { MyScreenProps } from "../sections/MySection";
import { FC } from "react";
import { userBonsaisStore, userStore } from "../dataStores/accountStore";
import MyBonsais from "../components/Common/MyBonsais";
import { AddCircle } from "iconsax-react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Box from "../components/Common/Box";
import Text from "../components/Common/Text";

const MyScreen: FC<MyScreenProps> = ({ navigation }) => {
  const userData = userStore();
  const { myBonsais } = userBonsaisStore();

  return (
    <>
      <NextStepButton
        onPress={() => {
          navigation.navigate("AddBonsai");
        }}
        primary="primarySalmonColor"
        title="neuer Bonsai"
        icon={
          <AddCircle
            size={wp(6.5)}
            color={theme.colors.textOnDark}
            variant="Broken"
          />
        }
        index={1}
      />
      <SafeAreaView
        style={{
          flex: 1,
          marginHorizontal: theme.spacing.m,
        }}
      >
        <ProfileInfos
          navigation={navigation}
          user={userData}
          bonsais={myBonsais.length}
        />
        {myBonsais.length === 0 ? (
          <Box flex={1}>
            <Box alignItems="center" height={wp(80)} justifyContent="center">
              <Box
                style={{
                  borderRadius: wp(50),
                  borderWidth: wp(2.5),
                  borderColor: theme.colors.primaryBGColor,
                }}
              >
                <Image
                  style={{
                    borderRadius: wp(50),
                    width: wp(50),
                    height: wp(50),
                  }}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/bonsaipflege-app.appspot.com/o/unsplashBonsai2.jpg?alt=media&token=60e38ccb-0364-4cdc-a7bf-4ef2a702e584",
                  }}
                />
              </Box>
              <Box marginTop="m" alignItems="center">
                <Text variant="title" color="error">
                  Du hast noch keine Bonsais!
                </Text>
                <Text variant="inputTitle" color="error">
                  Füge einen neuen hinzu.
                </Text>
              </Box>
            </Box>
          </Box>
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingTop: theme.spacing.m,
              paddingBottom: theme.spacing.xxl,
            }}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={100}
            windowSize={20}
            data={myBonsais}
            renderItem={(bonsai) => {
              return (
                <MyBonsais
                  bonsaiData={bonsai.item}
                  navigation={navigation}
                  user={userData}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default MyScreen;
