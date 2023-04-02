import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const feedItem = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.space.md,
});

export const link = style({
  color: vars.colors.textBrand2,
  fontSize: vars.fontSizes["md-fluid"],
  textDecoration: "none",
  position: "relative",
  ":visited": {
    color: vars.colors.text2,
  },
});

export const date = style({
  color: vars.colors.text2,
  fontSize: vars.fontSizes["sm-fluid"],
});
