"use client";
import { useSelector } from "src/store";
import { usePathname } from "next/navigation";
import { Link as RxLink } from "@radix-ui/themes";
import { Mail } from "lucide-react";
import Link from "next/link";

import { unreadLinkVMSelector } from "./Unread.VM.selector";

export function UnreadLink(props: { onClick?: () => void }) {
  const { status, data: count } = useSelector(unreadLinkVMSelector);
  const pathname = usePathname();
  const href = `/inbox/unread`;
  const isActive = pathname === href;

  if (status === "pending") return null;
  if (status === "rejected") return null;

  return (
    <RxLink
      underline={isActive ? "always" : "hover"}
      asChild
      className="flex items-center gap-1"
      onClick={props.onClick}
    >
      <Link href={href}>
        <Mail size={"1em"} /> Unread ({count})
      </Link>
    </RxLink>
  );
}
