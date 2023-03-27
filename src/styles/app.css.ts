import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle("html, body", {
  backgroundColor: vars.colors.surface1,
  color: vars.colors.text1,
  accentColor: vars.colors.brand,
  fontFamily: vars.fonts.sans,
});
