import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "src/styles/theme.css";

export const feedItem = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xxs,
});

export const link = recipe({
  base: {
    color: vars.colors["text-vibrant-low"],
    fontSize: vars.fontSizes["md-fluid"],
    textDecoration: "none",
    position: "relative",
    ":hover": {
      textDecoration: "underline",
    },
  },
  variants: {
    isRead: {
      true: {
        color: vars.colors["text-functional"],
      },
    },
  },
});

export const date = style({
  color: vars.colors["text-functional-low"],
  fontSize: vars.fontSizes["sm-fluid"],
  minWidth: "10ch",
});

export const isReadContainer = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.xxs,
});

export const isRead = style({
  accentColor: vars.colors.success,
});

export const markAsRead = style({
  borderRadius: vars.radii[1],
  border: "none",
  backgroundColor: vars.colors["text-vibrant-low"],
  color: vars.colors.bg,
  lineHeight: 1,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  ":hover": {
    cursor: "pointer",
  },
});
