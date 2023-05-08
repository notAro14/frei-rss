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
  minHeight: 75,
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
    fontSize: vars.fontSizes["sm-fluid"],
    textDecoration: "none",
    textTransform: "uppercase",
    padding: vars.space.sm,
    borderRadius: vars.radii[2],
    position: "relative",
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

export const unread = style({
  position: "absolute",
  top: -2,
  right: -5,
  borderRadius: vars.radii.round,
  backgroundColor: vars.colors["text-vibrant-low"],
  color: vars.colors.bg,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  fontSize: vars.fontSizes.xs,
});
