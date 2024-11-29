import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import db from "./firebaseConfig";
import userData from "../dataStores/userManagmentStore";
// userID;
// export function addBonsai(bonsai) {
//   var bonsais = db.collection("bonsais");
//   // var user = db.collection("userData").doc(userID);
//   bonsais.doc(),{ ...bonsai });
//   // user.set({ ...user, bonsais: [...user.bonsais, bonsai.id] });
// }

export function setSize() {
  const sizesRef = collection(db, "sizes");
  // var sizes = db.collection("sizes");
  setDoc(doc(sizesRef, "1"), {
    description: "von 152 bis zu 203 cm",
    sizeDE: "Großer Bonsai",
    sizeJP: "IMPERIAL",
  });
  setDoc(doc(sizesRef, "2"), {
    description: "von 102 bis zu 152 cm",
    sizeDE: "Großer Bonsai",
    sizeJP: "HACHI-UYE",
  });
  setDoc(doc(sizesRef, "3"), {
    description: "von 76 bis zu 122 cm",
    sizeDE: "Großer Bonsai",
    sizeJP: "OMONO oder DAI",
  });
  setDoc(doc(sizesRef, "4"), {
    description: "von 41 bis zu 91 cm",
    sizeDE: "Mittlerer Bonsai",
    sizeJP: "CHUMONO oder CHIU",
  });
  setDoc(doc(sizesRef, "5"), {
    description: "von 25 bis zu 46 cm",
    sizeDE: "Mittlerer Bonsai",
    sizeJP: "KATADE-MOCHI",
  });
  setDoc(doc(sizesRef, "6"), {
    description: "von 15 bis zu 25 cm",
    sizeDE: "Kleiner Bonsai",
    sizeJP: "KOMONO",
  });
  setDoc(doc(sizesRef, "7"), {
    description: "von 13 bis zu 20 cm",
    sizeDE: "Kleiner Bonsai",
    sizeJP: "SHONIN",
  });
  setDoc(doc(sizesRef, "8"), {
    description: "von 5 bis zu 15 cm.",
    sizeDE: "Miniaturbonsai",
    sizeJP: "MAME",
  });
  setDoc(doc(sizesRef, "9"), {
    description: "von 5 bis zu 10 cm.",
    sizeDE: "Miniaturbonsai",
    sizeJP: "SHITO",
  });
  setDoc(doc(sizesRef, "10"), {
    description: "von 3 bis zu 8 cm.",
    sizeDE: "Miniaturbonsai",
    sizeJP: "KETSCHITSUBO",
  });
}

export function setBonsai() {
  const bonsaisRef = collection(db, "bonsais");
  setDoc(doc(bonsaisRef, "2"), {
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
  const formsRef = collection(db, "forms");
  setDoc(doc(formsRef, "1"), {
    formDE: "Aufrecht",
    formJP: "TACHI-GI",
  });
  setDoc(doc(formsRef, "2"), {
    formDE: "gerader Stamm",
    formJP: "CHOKKAN",
  });
  setDoc(doc(formsRef, "3"), {
    formDE: "sehr wenig geneigter Stamm",
    formJP: "SHO-SHAKAN",
  });
  setDoc(doc(formsRef, "4"), {
    formDE: "mäßig geneigter Stamm",
    formJP: "CHU-SHAKAN",
  });
  setDoc(doc(formsRef, "5"), {
    formDE: "extrem geneigter Stamm",
    formJP: "DAI-SHAKAN",
  });
  setDoc(doc(formsRef, "6"), {
    formDE: "frei aufrecht",
    formJP: "MOYOGI",
  });
  setDoc(doc(formsRef, "7"), {
    formDE: "windgepeischt",
    formJP: "FUKINAGASHI",
  });
  setDoc(doc(formsRef, "8"), {
    formDE: "abstrakter und freier stil",
    formJP: "BUNJIN",
  });
  setDoc(doc(formsRef, "9"), {
    formDE: "knorriger Stamm",
    formJP: "BANKAN",
  });
  setDoc(doc(formsRef, "10"), {
    formDE: "verdrehter Stamm",
    formJP: "NEJIKAN",
  });
  setDoc(doc(formsRef, "11"), {
    formDE: "gespaltener oder ausgehöhlter Stamm",
    formJP: "SABAKAN",
  });
  setDoc(doc(formsRef, "12"), {
    formDE: "knotiger Stamm",
    formJP: "KOBUKAN",
  });
  setDoc(doc(formsRef, "13"), {
    formDE: "abgeschälte Rinde",
    formJP: "SHARIKAN",
  });
  setDoc(doc(formsRef, "14"), {
    formDE: "gewöhnliche oder normale Kaskade",
    formJP: "KENGAI",
  });
  setDoc(doc(formsRef, "15"), {
    formDE: "mäßige oder Halbkaskade",
    formJP: "HAN-KENGAI",
  });
  setDoc(doc(formsRef, "16"), {
    formDE: "extreme, fast senkrechte Kaskade",
    formJP: "DAI-KENGAI",
  });
  setDoc(doc(formsRef, "17"), {
    formDE: "Klippen- oder gewölbte Kaskade",
    formJP: "GAITO-KENGAI",
  });
  setDoc(doc(formsRef, "18"), {
    formDE: "Wasserfall-Kaskade",
    formJP: "TAKI-KENGAI",
  });
  setDoc(doc(formsRef, "19"), {
    formDE: "Stamm und Äste fallen kaskadenförmig wie ein Bündel Fäden",
    formJP: "ITO-KENGAI",
  });
  setDoc(doc(formsRef, "20"), {
    formDE: "drei- und mehrstämmige Kaskade",
    formJP: "TAKAN-KENGAI",
  });
  setDoc(doc(formsRef, "21"), {
    formDE: "Doppelstamm",
    formJP: "SOKAN",
  });
  setDoc(doc(formsRef, "22"), {
    formDE: "Zwillingsstamm",
    formJP: "SOJU",
  });
  setDoc(doc(formsRef, "23"), {
    formDE: "Mehrfachstamm",
    formJP: "KABUDACHI",
  });
  setDoc(doc(formsRef, "24"), {
    formDE:
      "mehrfache Triebe aus einem Stamm oder “aus einem Schildkrötenpanzer wachsend”",
    formJP: "KORABUKI",
  });
  setDoc(doc(formsRef, "25"), {
    formDE: "kriechende Form, Sprößlinge aus einer langen Öberflöchenwurzel",
    formJP: "NETSURANARI",
  });
  setDoc(doc(formsRef, "26"), {
    formDE: "Sprößlinge aus einem abgefallenen Zapfen",
    formJP: "YAMA-YORI",
  });
  setDoc(doc(formsRef, "27"), {
    formDE: "Floßform",
    formJP: "IKADABUKI",
  });
  setDoc(doc(formsRef, "28"), {
    formDE: "Gruppenpflanzung",
    formJP: "YOSE-UYE",
  });
  setDoc(doc(formsRef, "29"), {
    formDE: "Pflanzung über den Fels",
    formJP: "ISHI-ZUKE",
  });
  setDoc(doc(formsRef, "30"), {
    formDE: "Tintenfisch-Form",
    formJP: "TAKO-ZUKURI",
  });
  setDoc(doc(formsRef, "31"), {
    formDE: "Stelzwurzel-Form",
    formJP: "NE-AGARI",
  });
  setDoc(doc(formsRef, "32"), {
    formDE:
      "Gruppenpflanzung mit Bäumen, Felsen, Pflanzen und Moos, gestaltet zu einer natürlichen Landschaft",
    formJP: "SAIKEI",
  });
  setDoc(doc(formsRef, "33"), {
    formDE: "traditionelle Kieferform",
    formJP: "MATSU-ZUKURI",
  });
  setDoc(doc(formsRef, "34"), {
    formDE: "Besenform",
    formJP: "HOKI-ZUKURI",
  });
  setDoc(doc(formsRef, "35"), {
    formDE: "Ball- oder Eiform",
    formJP: "TAMA-ZUKURI",
  });
  setDoc(doc(formsRef, "36"), {
    formDE: "Flammenform",
    formJP: "ROSOKU-ZUKURI",
  });
  setDoc(doc(formsRef, "37"), {
    formDE: "Schirmform",
    formJP: "KASA-ZUKURI",
  });
  setDoc(doc(formsRef, "38"), {
    formDE: "übertriebene MATSU-ZUKURI",
    formJP: "HOSHO-ZUKURI",
  });
}
