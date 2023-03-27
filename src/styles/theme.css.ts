import { createThemeContract, createTheme } from "@vanilla-extract/css";
import props from "open-props";

const commonStyles = {
  fonts: {
    sans: props.fontSans,
  },
  fontWeights: {
    100: props.fontWeight1,
    200: props.fontWeight2,
    300: props.fontWeight3,
    400: props.fontWeight4,
    500: props.fontWeight5,
    600: props.fontWeight6,
    700: props.fontWeight7,
    800: props.fontWeight8,
    900: props.fontWeight9,
  },
  fontSizes: {
    xs: props.fontSize00,
    sm: props.fontSize0,
    md: props.fontSize1,
    lg: props.fontSize2,
    xl: props.fontSize3,
    "2xl": props.fontSize4,
    "3xl": props.fontSize5,
    "4xl": props.fontSize6,
    "5xl": props.fontSize7,
    "6xl": props.fontSize8,

    "sm-fluid": props.fontSizeFluid0,
    "md-fluid": props.fontSizeFluid1,
    "lg-fluid": props.fontSizeFluid2,
    "xl-fluid": props.fontSizeFluid3,
  },

  space: {
    "3xs": props.size000,
    xxs: props.size00,
    xs: props.size1,
    sm: props.size2,
    md: props.size3,
    lg: props.size4,
    xl: props.size5,
    "2xl": props.size6,
    "3xl": props.size7,
    "4xl": props.size8,
    "5xl": props.size9,
    "6xl": props.size10,
    "7xl": props.size11,
    "8xl": props.size12,
    "9xl": props.size13,
    "10xl": props.size14,
    "11xl": props.size15,
  },

  radii: {
    1: props.radius1,
    2: props.radius2,
    3: props.radius3,
    4: props.radius4,
    5: props.radius5,
    6: props.radius6,
    round: props.radiusRound,
  },
};

export const vars = createThemeContract({
  colors: {
    brand: null,
    text1: null,
    text2: null,
    surface1: null,
    surface2: null,
    surface3: null,
    surface4: null,
    surfaceShadow: null,
    shadowStrength: null,
    textBrand1: null,
    textBrand2: null,
    textError1: null,
  },
  ...commonStyles,
});

export const dark = createTheme(vars, {
  colors: {
    brand: props.orange3,
    text1: props.gray3,
    text2: props.gray5,
    surface1: props.gray12,
    surface2: props.gray11,
    surface3: props.gray10,
    surface4: props.gray9,
    surfaceShadow: props.gray12Hsl,
    shadowStrength: "80%",
    textBrand1: props.orange4,
    textBrand2: props.orange0,
    textError1: props.red4,
  },
  ...commonStyles,
});

export const light = createTheme(vars, {
  colors: {
    brand: props.orange6,
    text1: props.gray8,
    text2: props.gray7,
    surface1: props.gray0,
    surface2: props.gray1,
    surface3: props.gray2,
    surface4: props.gray3,
    surfaceShadow: props.gray8Hsl,
    shadowStrength: "2%",
    textBrand1: props.orange10,
    textBrand2: props.orange12,
    textError1: props.red11,
  },
  ...commonStyles,
});
