import { useCallback } from "react";
import { Check, BookCheck } from "lucide-react";
import { Card, Text, Flex, Link, IconButton } from "@radix-ui/themes";

import { State, useDispatch, useSelector } from "src/store";
import { selectFeedItem } from "./selectors";
import { markFeedItemAsRead } from "src/domain/Feed/usecases/markFeedItemAsRead";

interface Props {
  id: string;
}
export default function FeedItem({ id }: Props) {
  const selectFeedItemCb = useCallback(
    (state: State) => selectFeedItem(id)(state),
    [id]
  );
  const feedItem = useSelector(selectFeedItemCb);
  const dispatch = useDispatch();
  const onMarkAsRead = useCallback(
    () => dispatch(markFeedItemAsRead({ feedItemId: id })),
    [dispatch, id]
  );

  if (!feedItem) return null;
  const { date, title, url, readStatus } = feedItem;
  const isRead = readStatus === "READ";
  return (
    <Card
      variant={isRead ? "ghost" : "surface"}
      style={{ opacity: isRead ? "0.5" : "1" }}
    >
      <Flex gap={"2"} align={"center"} justify={"between"}>
        <Flex direction={"column"} gap={"2"}>
          <Flex align={"baseline"} gap={"2"}>
            {isRead && (
              <Text color="grass">
                <Check size={"1em"} />
              </Text>
            )}
            <Link size={"6"} href={url} target="_blank" rel="noopener">
              {title}
            </Link>
          </Flex>
          {date && <Text size={"1"}>{date}</Text>}
        </Flex>

        {!isRead && (
          <IconButton onClick={onMarkAsRead}>
            <BookCheck size={"1em"} />
          </IconButton>
        )}
      </Flex>
    </Card>
  );
}
