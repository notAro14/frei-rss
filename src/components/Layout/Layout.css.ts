import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "src/styles/theme.css";

export const root = style({
  minHeight: "100%",
  width: "min(100%, 80ch)",

  margin: "0 auto",
  padding: vars.space.lg,

  display: "flex",
  flexDirection: "column",
  gap: vars.space["3xl"],
});

export const navbar = style({
  position: "sticky",
  bottom: "1rem",
  width: "min(100%, 80ch)",
  minHeight: 50,
  margin: "0 auto",
  marginTop: "auto",

  display: "grid",
  placeItems: "center",

  boxShadow: vars.shadow,

  backgroundColor: vars.colors.surface,
  borderRadius: vars.radii[2],
});

export const navlinks = style({
  listStyleType: "none",
  padding: 0,
  display: "flex",
  gap: vars.space.md,
});

export const navlink = recipe({
  base: {
    color: vars.colors["text-functional"],
    lineHeight: 1,
    textDecoration: "none",
    textTransform: "uppercase",
    padding: vars.space.sm,
    borderRadius: vars.radii[2],
    ":hover": {
      backgroundColor: vars.colors["surface-vibrant-low"],
    },
  },
  variants: {
    isActive: {
      true: {
        backgroundColor: vars.colors["surface-vibrant-low"],
      },
    },
  },
});
