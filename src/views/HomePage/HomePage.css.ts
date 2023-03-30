import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const main = style({
  padding: vars.space.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.space["2xl"],
  width: "clamp(40ch, 100%, 80ch)",
  margin: "auto",
});

export const feeds = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const header = style({
  fontSize: vars.fontSizes["lg-fluid"],
  textDecoration: "underline",
  flex: "1",
});

export const flex = style({
  display: "flex",
  gap: vars.space.md,
  alignItems: "center",
});

export const toggleTheme = style({
  background: "none",
  color: vars.colors.text1,
  border: "none",
  padding: vars.space.sm,
  ":hover": {
    cursor: "pointer",
  },
});
