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
import NextLink from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { useSelector, useDispatch, State } from "src/store";
import { markFeedItemAsRead } from "src/lib/Feed/usecases/markFeedItemAsRead";
import { singleArticleSelector } from "src/selectors/singleArticle.selector";
import styles from "./styles.module.scss";
import { useWithSound } from "src/hooks/useWithSound";

export default function Page({ params }: { params: { slug: string } }) {
  const selector = useCallback(
    (state: State) => singleArticleSelector(state, params.slug),
    [params.slug],
  );
  const data = useSelector(selector);
  const router = useRouter();
  if (data === null) return <Text role="alert">Loading...</Text>;
  if (data.ok) {
    const article = data.article;
    return (
      <Flex direction={"column"} gap={"4"}>
        <Link asChild className="flex items-center gap-1">
          <NextLink href={`/inbox/feed/${article.feedId}`}>
            <ChevronLeft size={"1em"} /> Go back to feed
          </NextLink>
        </Link>
        <Card>
          <Flex mb={"5"} align={"center"} gap={"4"}>
            <MarkAsRead id={article.id} />
            <Link
              target="_blank"
              rel="noopener"
              className="flex w-max items-center gap-rx-2"
              href={article.url}
            >
              View original
              <ExternalLink size={"1em"} />
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
            <Text color="red" role="alert">
              Oups no preview was found
            </Text>
          )}
        </Card>
      </Flex>
    );
  }

  return router.push("/");
}

function MarkAsRead({ id }: { id: string }) {
  const { playSound } = useWithSound("/sounds/success.mp3");
  const isRead = useSelector(
    (state) => state.getFeeds.entities?.feedItems[id].readStatus === "READ",
  );
  const dispatch = useDispatch();

  return (
    <>
      {isRead ? (
        <Badge size={"2"} color="grass">
          Read
        </Badge>
      ) : (
        <Button
          variant="soft"
          onClick={async () => {
            await dispatch(markFeedItemAsRead({ feedItemId: id }));
            playSound();
          }}
        >
          Mark as read
        </Button>
      )}
    </>
  );
}
