import { ReactNode, Fragment } from "react";
import Head from "next/head";

import useGetFeeds from "src/hooks/useGetFeeds";
import * as styles from "./Layout.css";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  useGetFeeds();
  return (
    <Fragment>
      <Head>
        <title>Frei RSS</title>
      </Head>

      <section className={styles.root}>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/feeds">Feeds</Link>
        </nav>
        <main className={styles.main}>{props.children}</main>
      </section>
    </Fragment>
  );
}
