import { globalStyle } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

globalStyle("html, body", {
  backgroundColor: vars.colors.bg,
  fontFamily: vars.fonts.sans,
});
