import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const feedItem = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.space.md,
});

export const link = style({
  color: vars.colors.textBrand1,
  fontSize: vars.fontSizes["md-fluid"],
  ":visited": {
    color: vars.colors.textBrand2,
  },
});

export const date = style({
  color: vars.colors.text2,
  fontSize: vars.fontSizes["sm-fluid"],
});
