"use client";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { Link as RxLink } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { useSelector } from "src/store";
import { bookmarkedCountSelector } from "./Bookmarked.selector";

export function BookmarkedLink(props: { onClick?: () => void }) {
  const { status, data } = useSelector(bookmarkedCountSelector);
  const pathname = usePathname();
  const href = `/inbox/bookmarked`;
  const isActive = pathname === href;
  if (status === "pending") return null;
  if (status === "rejected") return null;
  return (
    <RxLink
      underline={isActive ? "always" : "hover"}
      asChild
      onClick={props.onClick}
      className="flex items-center gap-1"
    >
      <Link href={href}>
        <Bookmark size={"1em"} />
        {`Saved (${data.count})`}
      </Link>
    </RxLink>
  );
}
