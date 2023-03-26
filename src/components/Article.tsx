"use client";
import { useCallback } from "react";
import NextLink from "next/link";
import { Glasses } from "lucide-react";
import {
  Card,
  Text,
  Flex,
  Link,
  Badge,
  Avatar,
  Button,
} from "@radix-ui/themes";

import { useDispatch, useSelector } from "src/store";
import { getArticle } from "src/selectors/getArticle.selector";
import { markFeedItemAsRead } from "src/lib/Feed/usecases/markFeedItemAsRead";

interface Props {
  id: string;
}
export function Article({ id }: Props) {
  const feedItem = useSelector((state) => getArticle(state, id));
  const dispatch = useDispatch();
  const onMarkAsRead = useCallback(async () => {
    await dispatch(markFeedItemAsRead({ feedItemId: id }));
  }, [dispatch, id]);

  if (!feedItem) return null;
  const { pubDate, title, isRead, feed } = feedItem;
  return (
    <Card
      variant={isRead ? "ghost" : "surface"}
      className={isRead ? "px-rx-3 opacity-60" : "opacity-100"}
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
        <Text mb={"4"} size={"1"}>
          {pubDate}
        </Text>
        {!isRead ? (
          <Button variant="soft" onClick={onMarkAsRead}>
            <Glasses size={"1em"} /> Mark as read
          </Button>
        ) : (
          <Badge variant="surface" color="grass">
            Read
          </Badge>
        )}
      </Flex>
    </Card>
  );
}
