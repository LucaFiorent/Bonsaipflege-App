import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import db from "./firebaseConfig";

export function setSize() {
  var sizes = db.collection("sizes");
  sizes.doc("2").set({
    description: "Max. 130 cm ohne Schale",
    sizeDE: "Großer Bonsai",
    sizeJP: "OMONO BONSAI",
  });
  sizes.doc("3").set({
    description: "von 45-90 cm",
    sizeDE: "Mittlerer Bonsai",
    sizeJP: "CHUMONO BONSAI",
  });
  sizes.doc("4").set({
    description: "von 20-40 cm",
    sizeDE: "Bonsai für eine Hand",
    sizeJP: "KATADE-MOCHE BONSAI",
  });
  sizes.doc("5").set({
    description: "von 12-18 cm",
    sizeDE: "Kleiner Bonsai",
    sizeJP: "KOMONO BONSAI",
  });
  sizes.doc("6").set({
    description: "Miniatur",
    sizeDE: "Miniaturbonsai",
    sizeJP: "MAME BONSAI",
  });
}
