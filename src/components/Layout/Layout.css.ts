import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const root = style({
  minHeight: "100%",

  display: "flex",
  flexDirection: "column",

  backgroundColor: vars.colors.bg,
  fontFamily: vars.fonts.sans,
});

export const main = style({
  width: "min(100%, 80ch)",
  margin: "0 auto",

  padding: vars.space.lg,
});
