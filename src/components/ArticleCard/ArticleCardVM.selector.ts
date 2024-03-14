import { createSelector } from "@reduxjs/toolkit";
import DOMPurify from "dompurify";
import type { State } from "src/store";
import { formatToPubDate } from "src/utils/date";
import type { ArticleCardVM } from "./ArticleCardVM";

export const articleCardVMSelector = createSelector(
  [
    (state: State) => state.getFeeds.status,
    (state: State) => state.getFeeds.entities?.feeds,
    (state: State) => state.getFeeds.entities?.feedItems,
    (_state: State, id: string) => id,
  ],
  (status, feeds, feedItems, id): ArticleCardVM => {
    switch (status) {
      case "idle":
      case "pending":
        return { status: "pending", data: null, error: null };
      case "rejected":
        return { status: "rejected", data: null, error: "Failed to get feeds" };
      default: {
        const { title, date, url, feedId, readStatus, favorite } =
          feedItems![id];
        const { name, website } = feeds![feedId];
        const favicon =
          website &&
          `https://www.google.com/s2/favicons?domain=${new URL(website).hostname}&sz=128`;

        const data = {
          id,
          url,
          title: DOMPurify.sanitize(title),
          pubDate: formatToPubDate(date),
          status: readStatus,
          favorite,
          href: `/article/${id}`,
          feed: {
            id: feedId,
            name,
            favicon,
            href: `/inbox/feed/${feedId}`,
          },
        };
        return {
          status: "fulfilled",
          data,
          error: null,
        };
      }
    }
  },
);
