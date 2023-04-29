import { ReactNode } from "react";
import * as styles from "./Layout.css";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return <section className={styles.layout}>{props.children}</section>;
}
