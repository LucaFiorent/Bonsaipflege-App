import { useTheme } from "@shopify/restyle";
import * as React from "react";
import { useState } from "react";
import { Alert, ImageBackground, Pressable } from "react-native";
import { registration } from "../../firebase/firebase";
import { Theme } from "../../theme/theme";
import Box from "../Common/Box";
import Button from "../Common/Button";
import Input from "../Common/Input";
import Text from "../Common/Text";

const SignUp = ({ navigation }: any) => {
  // set theme
  const theme = useTheme<Theme>();
  // set bgimage
  const BGImage = require("../../assets/images/bonsai-background.jpg");
  // set states
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReapeat, setPasswordReapeat] = useState("");

  const emptyState = () => {
    setEmail("");
    setPassword("");
    setPasswordReapeat("");
  };

  const handlePress = () => {
    if (!email) {
      Alert.alert("E-Mail field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
    } else if (!passwordReapeat) {
      Alert.alert("Confirm password field is required.");
    } else if (password !== passwordReapeat) {
      emptyState();
      Alert.alert("Password does not match!");
    } else if (password.length < 6) {
      emptyState();
      Alert.alert("Password too Short!");
    } else {
      registration(email, password, nickname);
      emptyState();
    }
  };

  return (
    <ImageBackground
      source={BGImage}
      style={{
        flex: 1,
        justifyContent: "center",
      }}
      imageStyle={{
        opacity: 0.3,
      }}
    >
      <Box marginHorizontal="m">
        <Box marginBottom="m">
          <Text variant="h1">Profil Anmelden</Text>
        </Box>
        <Input
          label="Nickname"
          placeholder="add your nickname"
          value={nickname}
          onChange={(nickname) => setNickname(nickname)}
        />
        <Input
          label="E-Mail"
          placeholder="Add your E-Mail"
          value={email}
          onChange={(email) => setEmail(email)}
        />
        <Input
          label="Password"
          placeholder="add your password"
          value={password}
          type="password"
          onChange={(password) => setPassword(password)}
        />
        <Input
          label="Passwort wiederholen"
          placeholder="add your password"
          value={passwordReapeat}
          type="password"
          onChange={(passwordReapeat) => setPasswordReapeat(passwordReapeat)}
        />
        <Box alignItems="center" marginTop="l">
          <Button
            onPress={handlePress}
            title="Registrieren"
            primary={theme.colors.primarySalmonColor}
          />
        </Box>
        <Box marginTop="l" alignItems="center">
          <Pressable onPress={() => navigation.navigate("login")}>
            <Text color="primarySalmonColor">
              Schon angemeldet? Log dich ein!
            </Text>
          </Pressable>
        </Box>
      </Box>
    </ImageBackground>
  );
};
export default SignUp;
