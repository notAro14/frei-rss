import { ReactNode, Fragment } from "react";
import Link from "next/link";
import Head from "next/head";

import useGetFeeds from "src/hooks/useGetFeeds";
import * as styles from "./Layout.css";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  useGetFeeds();
  const { pathname } = useRouter();
  return (
    <Fragment>
      <Head>
        <title>Frei RSS</title>
      </Head>

      <main className={styles.root}>
        <article>{props.children}</article>
        <nav className={styles.navbar}>
          <ul className={styles.navlinks}>
            <li>
              <Link
                className={styles.navlink({ isActive: pathname === "/" })}
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={styles.navlink({ isActive: pathname === "/feeds" })}
                href="/feeds"
              >
                Feeds
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </Fragment>
  );
}
