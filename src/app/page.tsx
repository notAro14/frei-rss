"use client";
import { redirect } from "next/navigation";
import { useSelector } from "src/store";

export default function Page() {
  const firstFeedId = useSelector((state) => state.getFeeds.result?.[0]);
  if (firstFeedId) redirect(`/inbox/feed/${firstFeedId}`);
  return null;
}
