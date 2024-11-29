import { AppRegistry } from "react-native";
import App from "./App"; // Adjust the import path as necessary
import { name as appName } from "./app.json"; // Make sure this points to your app name

AppRegistry.registerComponent(appName, () => App);
