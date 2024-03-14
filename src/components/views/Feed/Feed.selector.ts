import { createSelector } from "@reduxjs/toolkit";
import type { State } from "src/store";
import type { FeedVM, FeedVMUnwrapped } from "./Feed.VM";

export const feedSelector = createSelector(
  [
    (state: State) => state.getFeeds.entities?.feeds,
    (state: State) => state.getFeeds.status,
    (_state: State, slug: string) => slug,
  ],
  (feedsNormalised, status, id): FeedVM => {
    if (status === "pending" || status === "idle")
      return { status: "pending", data: null, error: null };

    if (status === "fulfilled") {
      const feed = feedsNormalised?.[id];
      if (!feed)
        return {
          status: "rejected",
          data: null,
          error: "Oh no, are you lost ?",
        };

      const { website, name, url } = feed;
      const favicon = {
        src: website
          ? `https://www.google.com/s2/favicons?domain=${new URL(website).hostname}&sz=128`
          : undefined,
        fallback: name[0],
      };

      const data: FeedVMUnwrapped = {
        id,
        name,
        website,
        url,
        favicon,
        articles: feed.feedItems,
      };
      return { status, data, error: null };
    }
    return { status, data: null, error: "Could not retrieve feed" };
  },
);
