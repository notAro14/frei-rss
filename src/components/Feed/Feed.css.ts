import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const summary = style({
  color: vars.colors["text-functional"],
  fontSize: vars.fontSizes["md-fluid"],
});

export const ul = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["3xl"],
  maxHeight: 300,
  overflow: "auto",
  scrollbarGutter: "stable",
  overscrollBehavior: "contain",
});
