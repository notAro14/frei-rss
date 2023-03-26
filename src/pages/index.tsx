import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { formatRelative } from "date-fns";
import fr from "date-fns/locale/fr";
import Text from "src/components/Text";
import Header from "src/components/Header";
import * as styles from "src/styles/IndexPage.css";
import { useState } from "react";
import props from "open-props";

interface Feed {
  description: string;
  title: string;
  feedUrl: string;
  link: string;
  items: FeedItem[];
}

interface FeedItem {
  link: string;
  title: string;
  content?: string;
  isoDate?: string;
}

export default function Home() {
  const { data, error, isLoading } = useQuery<Feed[]>({
    queryKey: ["feed"],
    queryFn: async () => {
      const res = await fetch("/api/feed");
      if (!res.ok) throw new Error("Failed to get feed");
      return res.json();
    },
  });
  const [today] = useState(() => new Date());

  if (error) return <p role="alert">Failed to get feed</p>;
  if (isLoading) return <p role="progressbar">Loading...</p>;
  if (!data) return null;

  return (
    <>
      <Head>
        <title>Frei RSS</title>
        <meta name="description" content="RSS reader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header as="h1">RSS reader - Feed</Header>
        <div className={styles.feeds}>
          {data.map(({ link, items, title }) => {
            return (
              <details key={link}>
                <Text as="summary">{title}</Text>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: props.size3,
                    padding: 0,
                    listStyleType: "none",
                  }}
                >
                  {items.map(({ title, link, isoDate }) => {
                    const date = isoDate
                      ? formatRelative(new Date(isoDate), today, { locale: fr })
                      : null;
                    return (
                      <Text as="li" key={link}>
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <span
                            style={{
                              color: props.gray5,
                            }}
                          >
                            {date}
                          </span>
                          <a href={link} target="_blank" rel="noopener">
                            {title}
                          </a>
                        </span>
                      </Text>
                    );
                  })}
                </ul>
              </details>
            );
          })}
        </div>
      </main>
    </>
  );
}
