import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const layout = style({
  backgroundColor: vars.colors.bg,
  display: "flex",
  flexDirection: "column",
  fontFamily: vars.fonts.sans,
  minHeight: "100%",
});
