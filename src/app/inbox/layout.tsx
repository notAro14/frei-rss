"use client";
import {
  Flex,
  Link,
  Separator,
  Heading,
  Button,
  ScrollArea,
  Avatar,
} from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { ListPlus, Mail, Menu } from "lucide-react";
import { Drawer } from "vaul";
import NextLink from "next/link";
import type { ReactNode } from "react";

import { getUnreadArticlesCount } from "src/selectors/getUnreadArticleIds.selector";
import { useSelector } from "src/store";

import { useDrawerPortalContainerRef } from "src/components/DrawerPortalContainerProvider";
import { ThisMonthLink } from "src/components/ThisMonthArticles/ThisMonthLink";
import { BookmarkedLink } from "src/components/Bookmarked/BookmarkedLink";
import { LikedLink } from "src/components/Liked/LikedLink";
import { inboxVMSelector } from "src/components/views/Layouts/Inbox.VM.selector";
import { useDisclosure } from "src/hooks";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex flex-col gap-6 sm:flex-row">
      <FeedListDrawer />
      <FeedListSidebar />
      <main className="flex flex-1 flex-col gap-8">{children}</main>
    </section>
  );
}

function FeedListDrawer() {
  const ref = useDrawerPortalContainerRef();
  const { setIsOpen, isOpen, open, close } = useDisclosure();

  const { data: feeds, status } = useSelector(inboxVMSelector);
  const pathname = usePathname();
  if (status !== "fulfilled") return null;
  return (
    <Drawer.Root onOpenChange={setIsOpen} open={isOpen}>
      <Button className="block w-max sm:hidden" variant="soft" onClick={open}>
        <Menu size={"1em"} /> Menu
      </Button>
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
          className="fixed bottom-0 left-0 right-0 z-50 h-3/4 p-5"
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
              <LikedLink onClick={close} />
              <BookmarkedLink onClick={close} />
              <ThisMonthLink onClick={close} />
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
  const { data: feeds, status } = useSelector(inboxVMSelector);

  const pathname = usePathname();
  if (status !== "fulfilled") return null;

  return (
    <div
      className="hidden flex-col gap-4 p-2 sm:flex"
      style={{ maxWidth: 200 }}
    >
      <Button variant="soft" asChild>
        <NextLink href={"/inbox/discover"}>
          <ListPlus size={"1em"} /> New feed
        </NextLink>
      </Button>
      <Heading size="1" as="h6">
        Inbox
      </Heading>
      <LikedLink />
      <BookmarkedLink />
      <ThisMonthLink />
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
    </div>
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
      className="flex items-center gap-1"
      onClick={props.onClick}
    >
      <NextLink href={href}>
        <Mail size={"1em"} /> Unread ({count})
      </NextLink>
    </Link>
  );
}
