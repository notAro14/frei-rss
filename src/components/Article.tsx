import { useCallback } from "react";
import { BookCheck } from "lucide-react";
import { Card, Text, Flex, Link, IconButton } from "@radix-ui/themes";

import { useDispatch, useSelector } from "src/store";
import { getArticle } from "../selectors/getArticle.selector";
import { markFeedItemAsRead } from "src/lib/Feed/usecases/markFeedItemAsRead";

interface Props {
  id: string;
}
export function Article({ id }: Props) {
  const feedItem = useSelector((state) => getArticle(state, id));
  const dispatch = useDispatch();
  const onMarkAsRead = useCallback(
    () => dispatch(markFeedItemAsRead({ feedItemId: id })),
    [dispatch, id],
  );

  if (!feedItem) return null;
  const { date, title, url, readStatus } = feedItem;
  const isRead = readStatus === "READ";
  return (
    <Card
      variant={isRead ? "ghost" : "surface"}
      style={{ opacity: isRead ? "0.5" : "1" }}
    >
      <Flex gap={"3"} align={"center"} justify={"between"}>
        <Flex direction={"column"} gap={"2"}>
          <Link
            weight={"bold"}
            size={{ initial: "4", xs: "6" }}
            href={url}
            target="_blank"
            rel="noopener"
            title={title}
          >
            {title}{" "}
            {isRead && (
              <Text size={"4"} color="grass">
                <BookCheck size={"1em"} />
              </Text>
            )}
          </Link>
          {date && <Text size={"1"}>{date}</Text>}
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
