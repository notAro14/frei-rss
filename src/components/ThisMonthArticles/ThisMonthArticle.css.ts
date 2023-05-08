import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const ul = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["3xl"],
  // maxHeight: 500,
  // overflow: "auto",
  // scrollbarGutter: "stable",
  // overscrollBehavior: "contain",
});

export const text = style({
  color: vars.colors["text-functional"],
  fontSize: vars.fontSizes["md-fluid"],
});
