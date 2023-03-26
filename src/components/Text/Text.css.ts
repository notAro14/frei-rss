import props from "open-props";
import { style } from "@vanilla-extract/css";

export const text = style({
  fontFamily: props.fontSans,
  color: props.gray8,
});
