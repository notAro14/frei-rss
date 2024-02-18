"use client";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Link as RxLink } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { useSelector } from "src/store";
import { likedCountSelector } from "./Liked.selector";

export function LikedLink(props: { onClick?: () => void }) {
  const { status, data } = useSelector(likedCountSelector);
  const pathname = usePathname();
  const href = `/inbox/liked`;
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
        <Heart size={"1em"} />
        {`Liked (${data.count})`}
      </Link>
    </RxLink>
  );
}
