import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const main = style({
  padding: vars.space.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.space["2xl"],
});

export const feeds = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const header = style({
  fontSize: vars.fontSizes["lg-fluid"],
});
