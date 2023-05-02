import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const ul = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  maxHeight: 300,
  overflow: "auto",
  scrollbarGutter: "stable",
  overscrollBehavior: "contain",
});

export const header = style({
  color: vars.colors["text-vibrant"],
  fontSize: vars.fontSizes["lg-fluid"],
});

export const text = style({
  color: vars.colors["text-functional"],
  fontSize: vars.fontSizes["md-fluid"],
});
