import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const label = style({
  display: "flex",
  flexDirection: "column",
  color: vars.colors["text-functional-low"],
  fontSize: vars.fontSizes["sm-fluid"],
});

export const input = style({
  border: "1px solid",
  borderColor: vars.colors["text-functional-low"],
  backgroundColor: vars.colors.bg,
  padding: "0.5rem 1rem",
  borderRadius: vars.radii[2],
  fontSize: vars.fontSizes["md-fluid"],
  color: vars.colors["text-functional"],
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["3xs"],
});

export const error = style({
  color: vars.colors["text-functional"],
});

export const button = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radii[2],
  backgroundColor: vars.colors["text-vibrant-low"],
  border: "none",
  color: vars.colors.bg,
  textTransform: "uppercase",
  ":hover": {
    cursor: "pointer",
  },
});
