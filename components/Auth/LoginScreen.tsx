import { useTheme } from "@shopify/restyle";
import * as React from "react";
import { useState } from "react";
import { ImageBackground, Pressable } from "react-native";
import { login } from "../../firebase/firebase";
import { Theme } from "../../theme/theme";
//components
import Box from "../Common/Box";
import Button from "../Common/Button";
import Input from "../Common/Input";
import Text from "../Common/Text";

const LoginScreen = ({ navigation }) => {
  // set theme
  const theme = useTheme<Theme>();
  // set bgimage
  const BGImage = require("../../assets/images/bonsai-background.jpg");
  // set states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const emptyState = () => {
    setEmail("");
    setPassword("");
  };

  const handlePress = () => {
    if (!email || !password) {
      setMessage("Die E-Mail und/oder das Password duerfen nicht fehlen.");
      console.log(message);
    } else {
      login(email, password)
        .then(() => {
          console.log("logged in");
        })
        .catch(() => {
          console.log("the insert data is wrong");
        });
      emptyState();
      setMessage("");
    }
  };

  return (
    <ImageBackground
      source={BGImage}
      imageStyle={{
        opacity: 0.3,
      }}
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Box marginHorizontal="m">
        <Box marginBottom="m">
          <Text variant="h1">Los geht's</Text>
        </Box>

        <Input
          label="E-Mail"
          placeholder="E-Mail eingeben"
          value={email}
          onChange={(email) => setEmail(email)}
        />
        <Input
          label="Passwort"
          placeholder="Passwort eingeben"
          type="password"
          value={password}
          onChange={(password) => setPassword(password)}
        />
        <Text color="error">{message}</Text>
        <Box alignItems="center" marginTop="xxl">
          <Button
            onPress={handlePress}
            title="Einloggen"
            primary={theme.colors.primarySalmonColor}
          />
        </Box>

        <Pressable onPress={() => navigation.navigate("signup")}>
          <Box
            alignItems="center"
            marginTop="l"
            flexDirection="row"
            justifyContent="center"
          >
            <Text color="primarySalmonColor">Du hast noch keinen Account?</Text>
            <Text
              color="primarySalmonColor"
              fontWeight="bold"
              marginLeft="s"
              textDecorationLine="underline"
            >
              Hier registrieren
            </Text>
          </Box>
        </Pressable>
      </Box>
    </ImageBackground>
  );
};

export default LoginScreen;
