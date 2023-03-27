import { style } from "@vanilla-extract/css";
import props from "open-props";

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: props.size4,
  width: "clamp(100px, 100%, 500px)",
});

export const label = style({
  display: "flex",
  flexDirection: "column",
  color: props.gray7,
});

export const input = style({
  border: "1px solid",
  borderColor: props.gray10,
  padding: "0.5rem 1rem",
  borderRadius: props.radius2,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: props.size1,
});

export const error = style({
  color: props.red7,
});
