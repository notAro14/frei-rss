"use client";
import {
  Flex,
  Link as RxLink,
  Separator,
  Heading,
  Button,
  Avatar,
} from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { ListPlus } from "lucide-react";
import Link from "next/link";

import { useSelector } from "src/store";
import { ThisMonthLink } from "src/components/views/ThisMonthArticles";
import { BookmarkedLink } from "src/components/views/Bookmarked";
import { LikedLink } from "src/components/views/Liked";
import { UnreadLink } from "src/components/views/Unread";
import { feedMenuVMSelector } from "./FeedMenu.VM.selector";

export function FeedMenuSidebar() {
  const { data: feeds, status } = useSelector(feedMenuVMSelector);

  const pathname = usePathname();
  if (status !== "fulfilled") return null;

  return (
    <div
      className="hidden flex-col gap-4 p-2 sm:flex"
      style={{ maxWidth: 200 }}
    >
      <Button variant="soft" asChild>
        <Link href={"/inbox/discover"}>
          <ListPlus size={"1em"} /> New feed
        </Link>
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
            <RxLink underline={pathname === href ? "always" : "hover"} asChild>
              <Link href={href} dangerouslySetInnerHTML={{ __html: f.name }} />
            </RxLink>
          </Flex>
        );
      })}
    </div>
  );
}
