"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import { IconButton, Flex, Text, Badge, Strong } from "@radix-ui/themes";
import { RefreshCcw, ExternalLink } from "lucide-react";
import { useDispatch, useSelector } from "src/store";
import { Article } from "src/components/Article";
import { getAllFeeds } from "src/selectors/getAllFeeds.selector";
import { syncFeed } from "src/lib/Feed/usecases/syncFeed";
import styles from "./Feeds.module.css";

export function Feeds() {
  const feeds = useSelector(getAllFeeds);
  const getFeedsPending = useSelector(
    (state) => state.getFeeds.status === "pending",
  );
  const { status: syncFeedStatus } = useSelector((state) => state.syncFeed);
  const dispatch = useDispatch();

  if (getFeedsPending) return <Text role="alert">Loading...</Text>;
  if (!feeds) return null;
  if (!feeds.length)
    return <Text role="alert">You have to register a feed first</Text>;
  return (
    <Flex direction={"column"}>
      <Text mb={"4"}>
        You have <Strong>{feeds.length}</Strong> feeds
      </Text>
      {feeds.map((f) => (
        <details className={styles.details} key={f.id}>
          <Text asChild size={"4"}>
            <summary className={styles.summary}>
              <span dangerouslySetInnerHTML={{ __html: f.name }} />
              <Badge>{f.articleIds.length}</Badge>
            </summary>
          </Text>
          <Flex gap={"3"}>
            <IconButton variant="soft" asChild>
              <Link title="Open feed" href={`/feed/${f.id}`}>
                <ExternalLink size={"1em"} />
              </Link>
            </IconButton>
            <IconButton
              onClick={async () => {
                let res: string | void;
                try {
                  res = await dispatch(
                    syncFeed({ feedId: f.id, feedUrl: f.url }),
                  ).unwrap();
                  setTimeout(() => {
                    toast.success(res || "Synced");
                  }, 0);
                } catch (e) {
                  setTimeout(() => {
                    res && toast.error(res);
                  }, 0);
                }
              }}
              variant="soft"
              mb={"4"}
              disabled={syncFeedStatus === "pending"}
              title="Sync"
            >
              <RefreshCcw size={"1em"} />
            </IconButton>
          </Flex>
          <Flex direction={"column"} gap={"8"} pb={"8"}>
            {f.articleIds.map((id) => (
              <Article key={id} id={id} />
            ))}
          </Flex>
        </details>
      ))}
    </Flex>
  );
}
