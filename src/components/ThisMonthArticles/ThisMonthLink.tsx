"use client";
import { CalendarFold } from "lucide-react";
import Link from "next/link";
import { Link as RxLink } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { useSelector } from "src/store";
import { thisMonthArticlesCountSelector } from "./ThisMonthArticles.selector";

export function ThisMonthLink(props: { onClick?: () => void }) {
  const { status, data } = useSelector(thisMonthArticlesCountSelector);
  const pathname = usePathname();
  const href = `/inbox/this-month`;
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
        <CalendarFold size={"1em"} />
        {`This month (${data.count})`}
      </Link>
    </RxLink>
  );
}
