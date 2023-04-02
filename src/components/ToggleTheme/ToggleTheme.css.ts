import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const toggleTheme = style({
  background: "none",
  color: vars.colors.text1,
  border: "none",
  padding: vars.space.sm,
  ":hover": {
    cursor: "pointer",
  },
});
