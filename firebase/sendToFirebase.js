import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import db from "./firebaseConfig";
import userData from "../dataStores/userManagmentStore";
// userID;
// export function addBonsai(bonsai) {
//   var bonsais = db.collection("bonsais");
//   // var user = db.collection("userData").doc(userID);
//   bonsais.doc().set({ ...bonsai });
//   // user.set({ ...user, bonsais: [...user.bonsais, bonsai.id] });
// }

export function setSize() {
  var sizes = db.collection("sizes");
  sizes.doc("1").set({
    description: "von 152 bis zu 203 cm",
    sizeDE: "Großer Bonsai",
    sizeJP: "IMPERIAL",
  });
  sizes.doc("2").set({
    description: "von 102 bis zu 152 cm",
    sizeDE: "Großer Bonsai",
    sizeJP: "HACHI-UYE",
  });
  sizes.doc("3").set({
    description: "von 76 bis zu 122 cm",
    sizeDE: "Großer Bonsai",
    sizeJP: "OMONO oder DAI",
  });
  sizes.doc("4").set({
    description: "von 41 bis zu 91 cm",
    sizeDE: "Mittlerer Bonsai",
    sizeJP: "CHUMONO oder CHIU",
  });
  sizes.doc("5").set({
    description: "von 25 bis zu 46 cm",
    sizeDE: "Mittlerer Bonsai",
    sizeJP: "KATADE-MOCHI",
  });
  sizes.doc("6").set({
    description: "von 15 bis zu 25 cm",
    sizeDE: "Kleiner Bonsai",
    sizeJP: "KOMONO",
  });
  sizes.doc("7").set({
    description: "von 13 bis zu 20 cm",
    sizeDE: "Kleiner Bonsai",
    sizeJP: "SHONIN",
  });
  sizes.doc("8").set({
    description: "von 5 bis zu 15 cm.",
    sizeDE: "Miniaturbonsai",
    sizeJP: "MAME",
  });
  sizes.doc("9").set({
    description: "von 5 bis zu 10 cm.",
    sizeDE: "Miniaturbonsai",
    sizeJP: "SHITO",
  });
  sizes.doc("10").set({
    description: "von 3 bis zu 8 cm.",
    sizeDE: "Miniaturbonsai",
    sizeJP: "KETSCHITSUBO",
  });
}

export function setBonsai() {
  var bonsais = db.collection("bonsais");
  bonsais.doc("2").set({
    acquisitionDate: "24/09/1995",
    followers: [],
    form: "TACHI-GI",
    name: "bonsi",
    note: ["Max. 130 cm ohne Schale"],
    size: "OMONO BONSAI",
    tasks: [],
    type: "Ahorn",
    userId: "N6pgJh3DGfZ2wYwikAios2eCC712",
  });
}

export function setForms() {
  var forms = db.collection("forms");
  forms.doc("1").set({
    formDE: "Aufrecht",
    formJP: "TACHI-GI",
  });
  forms.doc("2").set({
    formDE: "gerader Stamm",
    formJP: "CHOKKAN",
  });
  forms.doc("3").set({
    formDE: "sehr wenig geneigter Stamm",
    formJP: "SHO-SHAKAN",
  });
  forms.doc("4").set({
    formDE: "mäßig geneigter Stamm",
    formJP: "CHU-SHAKAN",
  });
  forms.doc("5").set({
    formDE: "extrem geneigter Stamm",
    formJP: "DAI-SHAKAN",
  });
  forms.doc("6").set({
    formDE: "frei aufrecht",
    formJP: "MOYOGI",
  });
  forms.doc("7").set({
    formDE: "windgepeischt",
    formJP: "FUKINAGASHI",
  });
  forms.doc("8").set({
    formDE: "abstrakter und freier stil",
    formJP: "BUNJIN",
  });
  forms.doc("9").set({
    formDE: "knorriger Stamm",
    formJP: "BANKAN",
  });
  forms.doc("10").set({
    formDE: "verdrehter Stamm",
    formJP: "NEJIKAN",
  });
  forms.doc("11").set({
    formDE: "gespaltener oder ausgehöhlter Stamm",
    formJP: "SABAKAN",
  });
  forms.doc("12").set({
    formDE: "knotiger Stamm",
    formJP: "KOBUKAN",
  });
  forms.doc("13").set({
    formDE: "abgeschälte Rinde",
    formJP: "SHARIKAN",
  });
  forms.doc("14").set({
    formDE: "gewöhnliche oder normale Kaskade",
    formJP: "KENGAI",
  });
  forms.doc("15").set({
    formDE: "mäßige oder Halbkaskade",
    formJP: "HAN-KENGAI",
  });
  forms.doc("16").set({
    formDE: "extreme, fast senkrechte Kaskade",
    formJP: "DAI-KENGAI",
  });
  forms.doc("17").set({
    formDE: "Klippen- oder gewölbte Kaskade",
    formJP: "GAITO-KENGAI",
  });
  forms.doc("18").set({
    formDE: "Wasserfall-Kaskade",
    formJP: "TAKI-KENGAI",
  });
  forms.doc("19").set({
    formDE: "Stamm und Äste fallen kaskadenförmig wie ein Bündel Fäden",
    formJP: "ITO-KENGAI",
  });
  forms.doc("20").set({
    formDE: "drei- und mehrstämmige Kaskade",
    formJP: "TAKAN-KENGAI",
  });
  forms.doc("21").set({
    formDE: "Doppelstamm",
    formJP: "SOKAN",
  });
  forms.doc("22").set({
    formDE: "Zwillingsstamm",
    formJP: "SOJU",
  });
  forms.doc("23").set({
    formDE: "Mehrfachstamm",
    formJP: "KABUDACHI",
  });
  forms.doc("24").set({
    formDE:
      "mehrfache Triebe aus einem Stamm oder “aus einem Schildkrötenpanzer wachsend”",
    formJP: "KORABUKI",
  });
  forms.doc("25").set({
    formDE: "kriechende Form, Sprößlinge aus einer langen Öberflöchenwurzel",
    formJP: "NETSURANARI",
  });
  forms.doc("26").set({
    formDE: "Sprößlinge aus einem abgefallenen Zapfen",
    formJP: "YAMA-YORI",
  });
  forms.doc("27").set({
    formDE: "Floßform",
    formJP: "IKADABUKI",
  });
  forms.doc("28").set({
    formDE: "Gruppenpflanzung",
    formJP: "YOSE-UYE",
  });
  forms.doc("29").set({
    formDE: "Pflanzung über den Fels",
    formJP: "ISHI-ZUKE",
  });
  forms.doc("30").set({
    formDE: "Tintenfisch-Form",
    formJP: "TAKO-ZUKURI",
  });
  forms.doc("31").set({
    formDE: "Stelzwurzel-Form",
    formJP: "NE-AGARI",
  });
  forms.doc("32").set({
    formDE:
      "Gruppenpflanzung mit Bäumen, Felsen, Pflanzen und Moos, gestaltet zu einer natürlichen Landschaft",
    formJP: "SAIKEI",
  });
  forms.doc("33").set({
    formDE: "traditionelle Kieferform",
    formJP: "MATSU-ZUKURI",
  });
  forms.doc("34").set({
    formDE: "Besenform",
    formJP: "HOKI-ZUKURI",
  });
  forms.doc("35").set({
    formDE: "Ball- oder Eiform",
    formJP: "TAMA-ZUKURI",
  });
  forms.doc("36").set({
    formDE: "Flammenform",
    formJP: "ROSOKU-ZUKURI",
  });
  forms.doc("37").set({
    formDE: "Schirmform",
    formJP: "KASA-ZUKURI",
  });
  forms.doc("38").set({
    formDE: "übertriebene MATSU-ZUKURI",
    formJP: "HOSHO-ZUKURI",
  });
}
