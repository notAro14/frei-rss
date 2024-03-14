"use client";
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
import { articleCardVMSelector } from "./ArticleCardVM.selector";
import { changeFeedItemReadingStatus } from "src/lib/Feed/usecases/changeFeedItemReadingStatus";
import { likeOrUnlikeArticle } from "src/lib/Feed/usecases/likeArticle";

type Props = {
  id: string;
  disableReadStyle?: boolean;
};
export const ArticleCard = ({ id, disableReadStyle = false }: Props) => {
  const { status: fetchStatus, data: feedItem } = useSelector((state) =>
    articleCardVMSelector(state, id, disableReadStyle),
  );
  const dispatch = useDispatch();
  const onMarkAsRead = () =>
    dispatch(changeFeedItemReadingStatus({ id, newStatus: "READ" }));
  const onLikeOrUnlike = () => dispatch(likeOrUnlikeArticle(id));

  if (fetchStatus === "pending") return null;
  if (fetchStatus === "rejected") return null;

  const { pubDate, title, status, feed, favorite, href, ui } = feedItem;
  return (
    <Card
      variant={ui.card.variant}
      className={ui.card.className}
      style={{ height: 175 }}
    >
      <Flex direction={"column"} gap={"2"} align={"start"} height={"100%"}>
        <Flex gap={"2"} align={"center"} mb={"2"}>
          <Avatar
            size={"1"}
            radius="full"
            src={feed.favicon}
            fallback={feed.name.charAt(0)}
          />
          <Link size={"3"} asChild className="line-clamp-1">
            <NextLink href={feed.href}>{feed.name}</NextLink>
          </Link>
        </Flex>
        <Link
          weight={"bold"}
          size={{ initial: "4", xs: "6" }}
          title={title}
          mb={"-1"}
          className="line-clamp-2"
          asChild
        >
          <NextLink href={href} dangerouslySetInnerHTML={{ __html: title }} />
        </Link>
        <Text size={"1"}>{pubDate}</Text>
        <footer className="mt-auto flex w-full flex-wrap gap-2">
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
            variant={favorite ? "solid" : "outline"}
            onClick={onLikeOrUnlike}
            title={favorite ? "Unlike article" : "Like article"}
          >
            <Heart size={"0.75em"} />
          </IconButton>
        </footer>
      </Flex>
    </Card>
  );
};
