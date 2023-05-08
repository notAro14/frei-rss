import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const remove = style({
  width: 100,
  display: "flex",
  gap: vars.space.sm,
  alignItems: "center",
  justifyContent: "space-around",

  fontSize: vars.fontSizes["sm-fluid"],
  marginRight: vars.space.sm,
  border: "none",
  backgroundColor: vars.colors["error-low"],
  color: vars.colors["text-functional"],
  padding: vars.space.xs,
  borderRadius: vars.radii[2],
  ":hover": {
    cursor: "pointer",
  },
});

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
