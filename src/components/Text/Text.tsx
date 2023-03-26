import { ElementType, ReactNode } from "react";
import { text } from "./Text.css";

interface Props {
  children: ReactNode;
  as?: ElementType;
}

export default function Text(props: Props) {
  const Component = props.as ?? "span";
  return <Component className={text}>{props.children}</Component>;
}
