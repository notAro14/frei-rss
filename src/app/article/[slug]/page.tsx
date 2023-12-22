"use client";
import {
  Text,
  Box,
  Card,
  Link,
  Flex,
  Heading,
  Badge,
  Button,
} from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { useSelector, useDispatch } from "src/store";
import { markFeedItemAsRead } from "src/lib/Feed/usecases/markFeedItemAsRead";
import styles from "./styles.module.scss";

export default function Page({ params }: { params: { slug: string } }) {
  const dispatch = useDispatch();
  const slug = params.slug;
  const article = useSelector(
    (state) => state.getFeeds.entities?.feedItems[slug],
  );
  const getFeedsStatus = useSelector((state) => state.getFeeds.status);

  if (!article && getFeedsStatus === "pending")
    return <Text role="alert">Loading...</Text>;
  if (!article && getFeedsStatus === "fulfilled") redirect("/");
  if (!article) return null;

  const isRead = article.readStatus === "READ";

  return (
    <Card>
      <Flex mb={"5"} align={"center"} gap={"4"}>
        {isRead ? (
          <Badge size={"2"} color="grass">
            Read
          </Badge>
        ) : (
          <Button
            onClick={() =>
              dispatch(markFeedItemAsRead({ feedItemId: article.id }))
            }
          >
            Mark as read
          </Button>
        )}
        <Link
          target="_blank"
          rel="noopener"
          className="flex w-max items-center gap-rx-2"
          href={article.url}
        >
          View original
          <ExternalLink />
        </Link>
      </Flex>

      <Heading mb={"6"} as="h2">
        {article.title}
      </Heading>
      {article.content ? (
        <Box
          className={styles.preview}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      ) : (
        <Text color="crimson" role="alert">
          Oops no preview found
        </Text>
      )}
    </Card>
  );
}
