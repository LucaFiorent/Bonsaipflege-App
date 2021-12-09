import * as React from "react";
import { FlatList, SafeAreaView } from "react-native";
import theme from "../theme/theme";
import ProfileInfos from "../components/MyScreen/Profile/ProfileInfos";
import NextStepButton from "../components/Common/NextStepButton";
import { MyScreenProps } from "../sections/MySection";
import { FC } from "react";
import { userBonsaisStore, userStore } from "../dataStores/accountStore";
import MyBonsais from "../components/Home/Community/MyBonsais";

const MyScreen: FC<MyScreenProps> = ({ navigation }) => {
  const userData = userStore();

  const { myBonsais } = userBonsaisStore();

  return (
    <>
      {}
      <NextStepButton
        onPress={() => {
          navigation.navigate("AddBonsai");
        }}
        primary={theme.colors.primarySalmonColor}
        title="Neuer Bonsai"
        icon="plus"
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
            // removeClippedSubviews={true}
            // initialNumToRender={5}
            // maxToRenderPerBatch={5}
            // updateCellsBatchingPeriod={100}
            // windowSize={20}
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
