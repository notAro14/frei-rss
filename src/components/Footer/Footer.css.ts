import { style } from "@vanilla-extract/css";
import props from "open-props";

export const footer = style({
  marginTop: "auto",
  display: "grid",
  placeItems: "center",
  padding: props.size4,
});
