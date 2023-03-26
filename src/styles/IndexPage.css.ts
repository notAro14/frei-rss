import { style } from "@vanilla-extract/css";
import props from "open-props";

export const main = style({
  padding: props.size4,
  display: "flex",
  flexDirection: "column",
  gap: props.size4,
});

export const feeds = style({
  display: "flex",
  flexDirection: "column",
  gap: props.size2,
});
