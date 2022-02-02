import * as React from "react";
import { FlatList, SafeAreaView } from "react-native";
import theme from "../theme/theme";
import ProfileInfos from "../components/MyScreen/Profile/ProfileInfos";
import NextStepButton from "../components/Common/NextStepButton";
import { MyScreenProps } from "../sections/MySection";
import { FC } from "react";
import { userBonsaisStore, userStore } from "../dataStores/accountStore";
import MyBonsais from "../components/Common/MyBonsais";
import { AddCircle } from "iconsax-react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

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
        title="Neuer Bonsai"
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
        {myBonsais && (
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
