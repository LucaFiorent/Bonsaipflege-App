import * as React from "react";
import { SafeAreaView, ScrollView, Pressable, FlatList } from "react-native";
import Box from "../components/Common/Box";
import theme from "../theme/theme";
import ProfileInfos from "../components/MyScreen/Profile/ProfileInfos";
import { SimpleLineIcons } from "@expo/vector-icons";
import NextStepButton from "../components/Common/NextStepButton";
import { MyScreenProps } from "../sections/MySection";
import { FC, useEffect, useState } from "react";
import { userBonsaisStore, userStore } from "../dataStores/accountStore";
import Feed from "../components/Home/Community/Feed";
import useStore from "zustand";
import db from "../firebase/firebaseConfig";
import MyBonsais from "../components/Home/Community/MyBonsais";

const MyScreen: FC<MyScreenProps> = ({ navigation }) => {
  const userData = userStore();

  const { myBonsais } = userBonsaisStore();

  return (
    <>
      <NextStepButton
        onPress={() => {
          navigation.navigate("AddBonsai");
        }}
        primary={theme.colors.primarySalmonColor}
        title=""
        icon="plus"
      />
      <Box paddingHorizontal="m" backgroundColor={"mainBackground"}>
        <SafeAreaView>
          <ScrollView>
            <ProfileInfos bonsais={myBonsais.length} />
          </ScrollView>
        </SafeAreaView>
        <FlatList
          contentContainerStyle={{
            paddingTop: theme.spacing.m,
            paddingBottom: theme.spacing.l,
          }}
          data={myBonsais}
          renderItem={({ item }) => <MyBonsais bonsai={item} />}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </>
  );
};

export default MyScreen;
