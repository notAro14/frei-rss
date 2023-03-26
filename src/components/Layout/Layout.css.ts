import { style } from "@vanilla-extract/css";
import props from "open-props";

export const layout = style({
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",

  fontFamily: props.fontSans,
});
