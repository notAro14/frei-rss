import { ReactNode } from "react";
import { header } from "./Header.css";

interface Props {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function Header(props: Props) {
  const Component = props.as ?? "h2";
  return <Component className={header}>{props.children}</Component>;
}
