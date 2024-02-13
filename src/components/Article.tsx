"use client";
import { useCallback } from "react";
import NextLink from "next/link";
import { Bookmark, BookCheck, Glasses, Heart } from "lucide-react";
import {
  Card,
  Text,
  Flex,
  Link,
  Badge,
  Avatar,
  Button,
  IconButton,
} from "@radix-ui/themes";

import { useDispatch, useSelector } from "src/store";
import { getArticle } from "src/selectors/getArticle.selector";
import { changeFeedItemReadingStatus } from "src/lib/Feed/usecases/changeFeedItemReadingStatus";

type Props = {
  id: string;
};
export function Article({ id }: Props) {
  const feedItem = useSelector((state) => getArticle(state, id));
  const dispatch = useDispatch();
  const onMarkAsRead = useCallback(async () => {
    await dispatch(changeFeedItemReadingStatus({ id, newStatus: "READ" }));
  }, [dispatch, id]);

  if (!feedItem) return null;
  const { pubDate, title, status, feed } = feedItem;
  return (
    <Card
      variant={status === "READ" ? "ghost" : "surface"}
      className={status === "READ" ? "px-rx-3 opacity-60" : "opacity-100"}
    >
      <Flex direction={"column"} gap={"2"} align={"start"}>
        <Flex gap={"2"} align={"center"} mb={"2"}>
          <Avatar
            size={"1"}
            radius="full"
            src={feed.favicon}
            fallback={feed.name.charAt(0)}
          />
          <Link size={"3"} asChild className="line-clamp-1">
            <NextLink href={`/inbox/feed/${feed.id}`}>{feed.name}</NextLink>
          </Link>
        </Flex>
        <Link
          weight={"bold"}
          size={{ initial: "4", xs: "6" }}
          href={`/article/${id}`}
          title={title}
          mb={"-1"}
          className="line-clamp-2"
          asChild
        >
          <NextLink
            href={`/article/${id}`}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </Link>
        <Text size={"1"}>{pubDate}</Text>
        <footer className="flex w-full flex-wrap gap-2">
          {status === "UNREAD" && (
            <>
              <Button
                size={"1"}
                color="grass"
                variant="outline"
                onClick={onMarkAsRead}
              >
                <Glasses size={"1em"} /> Mark as read
              </Button>
              <Button
                variant="outline"
                size={"1"}
                color="yellow"
                onClick={() =>
                  dispatch(
                    changeFeedItemReadingStatus({
                      id,
                      newStatus: "READ_LATER",
                    }),
                  )
                }
              >
                <Bookmark size={"1em"} /> Read later
              </Button>
            </>
          )}
          {status === "READ" && (
            <Badge color="grass">
              <BookCheck size={"1em"} /> Read
            </Badge>
          )}
          {status === "READ_LATER" && (
            <>
              <Button
                size={"1"}
                color="grass"
                variant="outline"
                onClick={onMarkAsRead}
              >
                <Glasses size={"1em"} /> Mark as read
              </Button>
              <Badge color="yellow">
                <Bookmark size={"1em"} /> Saved
              </Badge>
            </>
          )}
          <IconButton
            className="ml-auto"
            radius="full"
            size={"1"}
            color="crimson"
            variant="outline"
          >
            <Heart size={"0.75em"} />
          </IconButton>
        </footer>
      </Flex>
    </Card>
  );
}
