import { createTheme } from "@vanilla-extract/css";
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

const SHADOW_COLOR_LIGHT = "211deg 5% 60%";
export const [light, vars] = createTheme({
  colors: {
    bg: props.gray1,

    "text-vibrant-low": props.pink7,
    "text-vibrant": props.pink12,

    "error-low": props.red7,

    "text-functional-low": props.gray7,
    "text-functional": props.gray12,

    surface: props.gray0,
    "surface-vibrant-low": props.pink1,
    success: props.green7,
  },
  shadow: `0.3px 0.5px 0.7px hsl(${SHADOW_COLOR_LIGHT} / 0.36),
  0.8px 1.6px 2px -0.8px hsl(${SHADOW_COLOR_LIGHT} / 0.36),
  2.1px 4.1px 5.2px -1.7px hsl(${SHADOW_COLOR_LIGHT} / 0.36),
  5px 10px 12.6px -2.5px hsl(${SHADOW_COLOR_LIGHT} / 0.36)`,
  ...commonStyles,
});

const SHADOW_COLOR_DARK = "210deg 17% 5%";
export const dark = createTheme(vars, {
  colors: {
    bg: props.gray9,

    "text-vibrant-low": props.yellow5,
    "text-vibrant": props.yellow0,

    "error-low": props.red5,

    "text-functional-low": props.gray5,
    "text-functional": props.gray0,

    surface: props.gray8,
    "surface-vibrant-low": props.yellow11,
    success: props.green4,
  },
  shadow: `0.3px 0.5px 0.7px hsl(${SHADOW_COLOR_DARK} / 0.36),
  0.8px 1.6px 2px -0.8px hsl(${SHADOW_COLOR_DARK} / 0.36),
  2.1px 4.1px 5.2px -1.7px hsl(${SHADOW_COLOR_DARK} / 0.36),
  5px 10px 12.6px -2.5px hsl(${SHADOW_COLOR_DARK} / 0.36)`,
  ...commonStyles,
});
