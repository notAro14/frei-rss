import props from "open-props";
import { style } from "@vanilla-extract/css";

export const header = style({
  fontFamily: props.fontSans,
  color: props.gray8,
  lineHeight: 1,
});
