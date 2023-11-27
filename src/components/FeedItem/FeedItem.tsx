import { useCallback } from "react";
import { Card, Button, Text, Flex, Link } from "@radix-ui/themes";

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
    <Card variant="classic">
      <Flex direction={"column"} gap={"4"} align={"start"}>
        <Flex direction={"column"} gap={"2"}>
          <Link size={"6"} href={url} target="_blank" rel="noopener">
            {title}
          </Link>
          {date && <Text size={"1"}>{date}</Text>}
        </Flex>

        {isRead ? (
          <Text color="grass">Read</Text>
        ) : (
          <Button onClick={onMarkAsRead}>Mark as read</Button>
        )}
      </Flex>
    </Card>
  );
}
