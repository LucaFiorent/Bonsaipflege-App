import { createTheme } from "@shopify/restyle";
import Colors from "../constants/Colors";

export const palette = {
  salmonPrimary: "#FAA2A2",
  salmonLight: "#F2B7AA",

  greenLight: "#C3D9CE",
  greenPrimary: "#85A695",
  greenDark: "#607E6F",

  orangeWarning: "#EB7E40",

  greyLight: "#E0E0E0",
  grey: "#9C9C9C",
  black: "#505059",
  white: "#fff",
};

const theme = createTheme({
  palette: {
    ...palette,
  },
  colors: {
    mainBackground: palette.white,
    greyBackground: palette.greyLight,

    primarySalmonColor: palette.salmonPrimary,
    primaryBGColor: palette.greenLight,
    primaryGreenColor: palette.greenPrimary,

    iconColor: palette.black,
    iconInactive: palette.greyLight,

    headline: palette.black,
    text: palette.black,
    placeholderColor: palette.grey,

    textOnDark: palette.white,
    textHighContrast: palette.black,

    descriptionText: palette.black,
    borderColor: palette.grey,
    borderInput: palette.grey,

    btnBg: palette.salmonPrimary,

    success: palette.greenPrimary,

    error: palette.orangeWarning,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 54,
  },
  borderRadii: {
    xs: 4,
    s: 8,
    m: 16,
    l: 32,
    xl: 64,
    xxl: 128,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    logo: {
      fontFamily: "HinaMincho-Regular",
      fontSize: 28,
    },
    h1: {
      fontFamily: "OpenSans-Regular",
      fontSize: 25,
      textTransform: "uppercase",
      color: "headline",
    },
    h2: {
      fontFamily: "OpenSans-Regular",
      fontSize: 26,
    },
    h3: {
      fontFamily: "OpenSans-Regular",
      fontSize: 24,
    },
    body: {
      fontFamily: "OpenSans-Regular",
      fontSize: 16,
    },
    button: {
      fontFamily: "OpenSans-Regular",
      fontSize: 22,
      textTransform: "uppercase",
    },
    description: {
      fontFamily: "Bebas-Neue",
      fontSize: 24,
    },
    placeholder: {
      fontFamily: "Ubuntu-Regular",
      fontSize: 18,
    },
    OpenSansPrimary: {
      fontFamily: "OpenSans-Bold",
      fontSize: 24,
    },
    UbuntuPrimary: {
      fontFamily: "Ubuntu-Regular",
      fontSize: 24,
    },
    OpenSansSekundaryBold: {
      fontFamily: "OpenSans-Bold",
      fontSize: 20,
    },
    inputTitle: {
      fontFamily: "Ubuntu-Regular",
      fontSize: 16,
      color: "primarySalmonColor",
    },
  },
});

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    iconInactive: palette.white,
    textHighContrast: palette.white,
    btnBg: palette.salmonLight,
    mainBackground: "#17141B",
    headline: palette.white,
    text: "rgba(255,255,255, 0.9)",
    descriptionText: palette.salmonLight,
    borderColor: "#272738",
    success: palette.greenLight,
    error: palette.orangeWarning,
  },
};

export type Theme = typeof theme;
export default theme;
