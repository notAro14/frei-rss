import { ReactNode, Fragment } from "react";
import Link from "next/link";
import Head from "next/head";

import useGetFeeds from "src/hooks/useGetFeeds";
import * as styles from "./Layout.css";
import { useRouter } from "next/router";
import { useSelector } from "src/store";
import unreadFeedItemsSelector from "src/selectors/unreadFeedItems.selector";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  useGetFeeds();
  const ids = useSelector(unreadFeedItemsSelector);
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
                This Month
              </Link>
            </li>
            <li>
              <Link
                className={styles.navlink({ isActive: pathname === "/unread" })}
                href="/unread"
              >
                <span>Unread</span>
                {ids?.length && (
                  <data className={styles.unread}>
                    {ids.length > 50 ? "+50" : ids.length}
                  </data>
                )}
              </Link>
            </li>
            <li>
              <Link
                className={styles.navlink({ isActive: pathname === "/feeds" })}
                href="/feeds"
              >
                All feeds
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </Fragment>
  );
}
