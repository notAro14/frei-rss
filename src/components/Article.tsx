"use client";
import { useCallback } from "react";
import NextLink from "next/link";
import { BookCheck, ChevronRight } from "lucide-react";
import { Card, Text, Flex, Link, IconButton, Badge } from "@radix-ui/themes";

import { useDispatch, useSelector } from "src/store";
import { getArticle } from "../selectors/getArticle.selector";
import { markFeedItemAsRead } from "src/lib/Feed/usecases/markFeedItemAsRead";
import { useWithSound } from "src/hooks/useWithSound";

interface Props {
  id: string;
}
export function Article({ id }: Props) {
  const { playSound } = useWithSound("/sounds/pop.mp3");
  const feedItem = useSelector((state) => getArticle(state, id));
  const dispatch = useDispatch();
  const onMarkAsRead = useCallback(async () => {
    await dispatch(markFeedItemAsRead({ feedItemId: id }));
    playSound();
  }, [dispatch, id, playSound]);

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
          >
            {title}
          </Link>
          {date && <Text size={"1"}>{date}</Text>}
          <Link className="flex items-center gap-rx-1" asChild>
            <NextLink href={`/article/${feedItem.id}`}>
              Read more <ChevronRight size={"1em"} />
            </NextLink>
          </Link>
        </Flex>

        {!isRead && (
          <IconButton variant="soft" onClick={onMarkAsRead}>
            <BookCheck size={"1em"} />
          </IconButton>
        )}
      </Flex>
    </Card>
  );
}
