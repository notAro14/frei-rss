"use client";
import { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  IconButton,
  Flex,
  Text,
  Badge,
  Strong,
  Button,
} from "@radix-ui/themes";
import { RefreshCcw, BookOpen } from "lucide-react";
import { useDispatch, useSelector } from "src/store";
import { Article } from "src/components/Article";
import { getAllFeeds } from "src/selectors/getAllFeeds.selector";
import { syncFeed } from "src/lib/Feed/usecases/syncFeed";
import styles from "./Feeds.module.css";
import { reset } from "src/lib/Feed/slices/syncFeed.slice";

export function Feeds() {
  const feeds = useSelector(getAllFeeds);
  const { status: syncFeedStatus, message: syncFeedMessage } = useSelector(
    (state) => state.syncFeed,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (syncFeedMessage) {
      if (syncFeedStatus === "error") toast.error(syncFeedMessage);
      if (syncFeedStatus === "success") toast.success(syncFeedMessage);
    }
    setTimeout(() => {
      if (syncFeedStatus !== "idle") dispatch(reset());
    }, 0);
  }, [syncFeedMessage, syncFeedStatus, dispatch]);

  if (!feeds) return null;
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
            <IconButton
              onClick={() =>
                dispatch(syncFeed({ feedId: f.id, feedUrl: f.url }))
              }
              variant="soft"
              mb={"4"}
              disabled={syncFeedStatus === "pending"}
              title="Sync"
            >
              <RefreshCcw size={"1em"} />
            </IconButton>
            <IconButton variant="soft" asChild>
              <Link title="Open feed" href={`/feed/${f.id}`}>
                <BookOpen size={"1em"} />
              </Link>
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
