import { recipe } from "@vanilla-extract/recipes";
import { vars } from "src/styles/theme.css";

export const flex = recipe({
  base: {
    display: "flex",
  },
  variants: {
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
    },
    gap: {
      xxs: {
        gap: vars.space.xxs,
      },
      xs: {
        gap: vars.space.xs,
      },
      sm: {
        gap: vars.space.sm,
      },
      md: {
        gap: vars.space.md,
      },
    },
  },
  defaultVariants: {
    direction: "row",
  },
});
