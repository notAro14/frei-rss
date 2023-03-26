import { style } from "@vanilla-extract/css";
import props from "open-props";

export const feedItem = style({
  display: "flex",
  alignItems: "baseline",
  gap: props.size4,
});

export const link = style({
  fontFamily: props.fontSans,
});

export const date = style({
  fontFamily: props.fontSans,
  color: props.gray7,
});
