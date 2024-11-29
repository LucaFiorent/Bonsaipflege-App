import { createTheme } from "@shopify/restyle";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

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
  braun: "#8D7D74",
  blue: "#6DABED",
};

const theme = createTheme({
  palette: {
    ...palette,
  },
  colors: {
    mainBackground: palette.white,
    greyBackground: palette.greyLight,

    primarySalmonColor: palette.salmonPrimary,
    primaryLightSalmonColor: palette.salmonLight,
    primaryBGColor: palette.greenLight,
    primaryGreenColor: palette.greenPrimary,

    iconColor: palette.black,

    iconInactive: palette.grey,
    iconInactiveBackground: palette.greyLight,

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

    watering: palette.blue,
    fertilizer: palette.braun,
  },
  // spacing: {
  //   null: 0,
  //   xxs: 3,
  //   xs: 4,
  //   s: 8,
  //   ms: 12,
  //   m: 16,
  //   l: 24,
  //   xl: 40,
  //   xxl: 54,
  //   x3l: 80,
  // },
  spacing: {
    null: 0,
    xxs: wp(0.5),
    xss: wp(0.8),
    xs: wp(1.5),
    s: wp(2),
    ms: wp(3.5),
    m: wp(4),
    l: wp(4.5),
    xl: wp(6),
    xxl: wp(7),
    x3l: wp(8),
  },
  // borderRadii: {
  //   xs: 4,
  //   s: 8,
  //   m: 16,
  //   l: 32,
  //   xl: 64,
  //   xxl: 128,
  // },
  borderRadii: {
    xs: wp(1),
    s: wp(2),
    m: wp(3),
    l: wp(6.5),
    xl: wp(15),
    xxl: wp(20),
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      fontFamily: "OpenSans-Regular",
      fontSize: wp(4),
      color: "text",
    },
    logo: {
      fontFamily: "HinaMincho-Regular",
      fontSize: wp(6),
      // fontSize: 28,
    },
    h1: {
      fontFamily: "OpenSans-Regular",
      // fontSize: 25,
      fontSize: wp(5.5),
      textTransform: "uppercase",
      color: "headline",
    },
    h2: {
      fontFamily: "OpenSans-Regular",
      // fontSize: 26,
      fontSize: wp(5.7),
    },
    h3: {
      fontFamily: "OpenSans-Regular",
      fontSize: wp(4.5),
    },
    body: {
      fontFamily: "OpenSans-Regular",
      // fontSize: 16,
      fontSize: wp(4),
    },
    button: {
      fontFamily: "OpenSans-Regular",
      // fontSize: 22,
      fontSize: wp(3.8),
      textTransform: "uppercase",
    },
    buttonWithIcon: {
      fontFamily: "OpenSans-Regular",
      // fontSize: 12,
      fontSize: wp(3),
    },
    description: {
      fontFamily: "OpenSans-Regular",
    },
    placeholder: {
      fontFamily: "Ubuntu-Regular",
      fontSize: wp(3.8),
    },
    OpenSansPrimary: {
      fontFamily: "OpenSans-Bold",
    },
    UbuntuPrimary: {
      fontFamily: "Ubuntu-Regular",
    },
    OpenSansSekundaryBold: {
      fontFamily: "OpenSans-Bold",
      fontSize: 20,
    },
    inputTitle: {
      fontFamily: "Ubuntu-Regular",
      fontSize: wp(3.5),
      color: "primarySalmonColor",
    },
    title: {
      // fontSize: 18,
      fontSize: wp(3.8),
      fontFamily: "OpenSans-Bold",
      textTransform: "uppercase",
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
