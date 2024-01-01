"use client";
import { useCallback } from "react";
import NextLink from "next/link";
import { ChevronRight, Glasses } from "lucide-react";
import { Card, Text, Flex, Link, IconButton, Badge } from "@radix-ui/themes";

import { useDispatch, useSelector } from "src/store";
import { getArticle } from "../selectors/getArticle.selector";
import { markFeedItemAsRead } from "src/lib/Feed/usecases/markFeedItemAsRead";
// import { useWithSound } from "src/hooks/useWithSound";

interface Props {
  id: string;
}
export function Article({ id }: Props) {
  // const { playSound: play1 } = useWithSound("/sounds/yay-1.mp3");
  // const { playSound: play2 } = useWithSound("/sounds/yay-2.mp3");
  // const { playSound: play3 } = useWithSound("/sounds/yay-3.mp3");
  const feedItem = useSelector((state) => getArticle(state, id));
  const dispatch = useDispatch();
  const onMarkAsRead = useCallback(async () => {
    // const plays = [play1, play2, play3];
    // const random = Math.floor(Math.random() * 3);
    // const play = plays[random];
    // play();

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
