"use client";
import { Drawer } from "vaul";
import {
  Flex,
  Link as RxLink,
  Separator,
  Heading,
  Button,
  ScrollArea,
  Avatar,
} from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListPlus, Menu } from "lucide-react";

import { useSelector } from "src/store";
import { useDisclosure } from "src/hooks";
import { ThisMonthLink } from "src/components/views/ThisMonthArticles";
import { BookmarkedLink } from "src/components/views/Bookmarked";
import { LikedLink } from "src/components/views/Liked";
import { UnreadLink } from "src/components/views/Unread";
import { useDrawerPortalContainerRef } from "src/components/DrawerPortalContainerProvider";
import { feedMenuVMSelector } from "./FeedMenu.VM.selector";

export function FeedMenuDrawer() {
  const ref = useDrawerPortalContainerRef();
  const { setIsOpen, isOpen, open, close } = useDisclosure();

  const { data: feeds, status } = useSelector(feedMenuVMSelector);
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
                <Link href={"/inbox/discover"}>
                  <ListPlus size={"1em"} /> New feed
                </Link>
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
                    <RxLink
                      underline={pathname === href ? "always" : "hover"}
                      onClick={close}
                      asChild
                    >
                      <Link
                        href={href}
                        dangerouslySetInnerHTML={{ __html: f.name }}
                      />
                    </RxLink>
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
