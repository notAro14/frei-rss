"use client";
import {
  Box,
  Flex,
  Link,
  Separator,
  Heading,
  Button,
  ScrollArea,
  Avatar,
} from "@radix-ui/themes";
import { ListPlus, Menu } from "lucide-react";
import { Drawer } from "vaul";
import { createSelector } from "@reduxjs/toolkit";
import NextLink from "next/link";
import { ReactNode, useCallback, useState } from "react";
import { getUnreadArticlesCount } from "src/selectors/getUnreadArticleIds.selector";
import { useSelector, type State } from "src/store";
import type { Res } from "src/types/response";
import { useDrawerPortalContainerRef } from "src/components/DrawerPortalContainerProvider";
import { usePathname } from "next/navigation";

const allFeedsSelector = createSelector(
  [
    (state: State) => state.getFeeds.status,
    (state: State) => state.getFeeds.result!,
    (state: State) => state.getFeeds.entities?.feeds,
  ],
  (
    status,
    feedIds,
    normalizedFeeds,
  ): Res<
    {
      id: string;
      name: string;
      favicon?: string;
    }[]
  > => {
    if (status === "fulfilled") {
      const res = feedIds.map((fId) => {
        const feed = normalizedFeeds![fId];
        const favicon =
          feed.website &&
          `https://www.google.com/s2/favicons?domain=${new URL(feed.website).hostname}&sz=128`;
        return {
          id: feed.id,
          name: feed.name,
          favicon,
        };
      });
      return {
        status: "fulfilled",
        data: res,
        error: null,
      };
    }

    return {
      status: "pending",
      data: null,
      error: null,
    };
  },
);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex
      direction={{ initial: "column", xs: "row" }}
      position={"relative"}
      gap={"6"}
    >
      <FeedListDrawer />
      <FeedListSidebar />
      <Box className="flex-1">{children}</Box>
    </Flex>
  );
}

function useDisclosure(init = false) {
  const [isOpen, setIsOpen] = useState(init);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return { open, close, isOpen, setIsOpen };
}

function FeedListDrawer() {
  const ref = useDrawerPortalContainerRef();
  const { setIsOpen, isOpen, open, close } = useDisclosure();

  const { data: feeds, status } = useSelector(allFeedsSelector);
  const pathname = usePathname();
  if (status !== "fulfilled") return null;
  return (
    <Drawer.Root onOpenChange={setIsOpen} open={isOpen}>
      <Box display={{ initial: "block", xs: "none" }}>
        <Button variant="soft" onClick={open}>
          <Menu size={"1em"} /> Menu
        </Button>
      </Box>
      <Drawer.Portal container={ref}>
        <Drawer.Overlay
          className="fixed inset-0 z-40"
          style={{
            backgroundColor: "var(--color-overlay)",
          }}
        />
        <Drawer.Content
          style={{
            backgroundColor: "var(--color-page-background)",
          }}
          className="fixed bottom-0 left-0 right-0 z-50 h-3/4 p-rx-5"
        >
          <ScrollArea>
            <Flex direction={"column"} gap={"4"} pb={"8"}>
              <Button onClick={close} asChild variant="soft">
                <NextLink href={"/inbox/discover"}>
                  <ListPlus size={"1em"} /> New feed
                </NextLink>
              </Button>

              <Heading size="1" as="h6" mb={"-3"}>
                Inbox
              </Heading>
              <UnreadLink onClick={close} />
              <Separator size={"4"} />
              <Heading size="1" as="h6" mb={"-2"}>
                {`Feeds (${feeds.length})`}
              </Heading>
              {feeds.map((f) => {
                const href = `/inbox/feed/${f.id}`;
                return (
                  <Flex gap={"2"} key={f.id}>
                    <Avatar
                      src={f.favicon}
                      fallback={f.name.charAt(0)}
                      radius="full"
                      size={"1"}
                    />
                    <Link
                      underline={pathname === href ? "always" : "hover"}
                      onClick={close}
                      asChild
                    >
                      <NextLink
                        href={href}
                        dangerouslySetInnerHTML={{ __html: f.name }}
                      />
                    </Link>
                  </Flex>
                );
              })}
            </Flex>
          </ScrollArea>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function FeedListSidebar() {
  const { data: feeds, status } = useSelector(allFeedsSelector);

  const pathname = usePathname();
  if (status !== "fulfilled") return null;

  return (
    <Flex
      display={{ initial: "none", xs: "flex" }}
      style={{ maxWidth: 200 }}
      p={"2"}
      direction={"column"}
      gap={"4"}
    >
      <Button variant="soft" asChild>
        <NextLink href={"/inbox/discover"}>
          <ListPlus size={"1em"} /> New feed
        </NextLink>
      </Button>
      <Heading size="1" as="h6">
        Inbox
      </Heading>
      <UnreadLink />
      <Separator size={"4"} />
      <Heading size="1" as="h6">
        {`Feeds (${feeds.length})`}
      </Heading>
      {feeds.map((f) => {
        const href = `/inbox/feed/${f.id}`;
        return (
          <Flex key={f.id} gap={"2"}>
            <Avatar
              src={f.favicon}
              fallback={f.name.charAt(0)}
              radius="full"
              size={"1"}
            />
            <Link underline={pathname === href ? "always" : "hover"} asChild>
              <NextLink
                href={href}
                dangerouslySetInnerHTML={{ __html: f.name }}
              />
            </Link>
          </Flex>
        );
      })}
    </Flex>
  );
}

function UnreadLink(props: { onClick?: () => void }) {
  const count = useSelector(getUnreadArticlesCount);
  const pathname = usePathname();
  const href = `/inbox/unread`;
  const isActive = pathname === href;
  if (count === null) return null;
  return (
    <Link
      underline={isActive ? "always" : "hover"}
      asChild
      onClick={props.onClick}
    >
      <NextLink href={href}>Unread ({count})</NextLink>
    </Link>
  );
}
