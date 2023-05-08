import { recipe } from "@vanilla-extract/recipes";
import { vars } from "src/styles/theme.css";

export const heading = recipe({
  base: {
    color: vars.colors["text-vibrant"],
  },
  variants: {
    level: {
      h2: {
        fontSize: vars.fontSizes["lg-fluid"],
      },
    },
  },
  defaultVariants: {
    level: "h2",
  },
});
