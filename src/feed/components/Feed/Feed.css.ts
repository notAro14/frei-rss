import { style } from "@vanilla-extract/css";
import props from "open-props";

export const summary = style({
  fontFamily: props.fontSans,
  color: props.gray9,
});

export const ul = style({
  display: "flex",
  flexDirection: "column",
  gap: props.size2,
});
