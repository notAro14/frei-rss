"use client";
import { useCallback } from "react";
import NextLink from "next/link";
import { ChevronRight, Glasses } from "lucide-react";
import { Card, Text, Flex, Link, IconButton, Badge } from "@radix-ui/themes";

import { useDispatch, useSelector } from "src/store";
import { getArticle } from "../selectors/getArticle.selector";
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
  const { date, title, url, readStatus } = feedItem;
  const isRead = readStatus === "READ";
  return (
    <Card
      variant={isRead ? "ghost" : "surface"}
      className={isRead ? "px-rx-3 opacity-60" : "opacity-100"}
    >
      <Flex gap={"3"} align={"center"} justify={"between"}>
        <Flex direction={"column"} gap={"2"} align={"start"}>
          {isRead && (
            <Badge variant="surface" color="grass">
              Read
            </Badge>
          )}
          <Link
            weight={"bold"}
            size={{ initial: "4", xs: "6" }}
            href={url}
            target="_blank"
            rel="noopener"
            title={title}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {date && <Text size={"1"}>{date}</Text>}
          <Link className="flex items-center gap-rx-1" asChild>
            <NextLink href={`/article/${feedItem.id}`}>
              Details <ChevronRight size={"1em"} />
            </NextLink>
          </Link>
        </Flex>

        {!isRead && (
          <IconButton variant="soft" onClick={onMarkAsRead}>
            <Glasses size={"1em"} />
          </IconButton>
        )}
      </Flex>
    </Card>
  );
}
