import type { ReactNode } from "react";

import { FeedMenuDrawer, FeedMenuSidebar } from "src/components/views/FeedMenu";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex flex-col gap-6 sm:flex-row">
      <FeedMenuDrawer />
      <FeedMenuSidebar />
      <main className="flex flex-1 flex-col gap-8">{children}</main>
    </section>
  );
}
