import { style } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

export const feeds = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["3xl"],
  listStyleType: "none",
});
