"use client";
import type { ReactNode } from "react";

import { FeedMenuDrawer, FeedMenuSidebar } from "src/components/views/FeedMenu";
import { useSelector } from "src/store";

export default function Layout({ children }: { children: ReactNode }) {
  const status = useSelector((state) => state.getFeeds.status);
  return (
    <section className="relative flex flex-col gap-6 sm:flex-row">
      <FeedMenuDrawer />
      <FeedMenuSidebar />
      {status === "pending" && (
        <div
          className="hidden flex-col gap-4 p-2 sm:flex"
          style={{ maxWidth: 200 }}
        />
      )}
      <main className="flex flex-1 flex-col gap-8">{children}</main>
    </section>
  );
}
