import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const footer = style({
  marginTop: "auto",
  display: "grid",
  placeItems: "center",
  padding: vars.space["4xl"],
  fontSize: vars.fontSizes["sm-fluid"],
});

export const link = style({
  color: vars.colors.textBrand2,
});
