import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import App from "../App";
import theme from "../theme/theme";

import { RootStackScreenProps } from "../types/types";

export default function NotFoundScreen() {
  // {  navigation,}: RootStackScreenProps<"NotFound">
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upps! Etwas ist schiefgelaufen</Text>
      <Text style={styles.subtitle}>
        Wir versuchen den Fehler so schnell wie möglich zu beheben und bitten um
        dein Verständnis!
      </Text>
      <TouchableOpacity style={styles.link} onPress={() => {}}>
        <View
          style={{
            backgroundColor: "#EB7E40",
            borderRadius: wp(40),
            paddingHorizontal: wp(6.5),
            paddingVertical: wp(4.2),
          }}
        >
          <Text style={styles.button}>Zurück zur Home</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
    alignItems: "center",
    justifyContent: "center",
    padding: wp(10),
  },
  title: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: theme.colors.error,
    marginBottom: theme.spacing.l,
  },
  button: {
    fontSize: wp(4),
    textTransform: "uppercase",
    color: theme.colors.textOnDark,
  },
  subtitle: {
    fontSize: wp(3.6),
    textAlign: "center",
    color: theme.colors.textHighContrast,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
