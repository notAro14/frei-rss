import { formatToPubDate } from "src/utils/date";
import type { State } from "src/store";
import { createSelector } from "@reduxjs/toolkit";
import DOMPurify from "dompurify";
import type { FeedItem } from "src/lib/Feed/models/Feed.entity";

export const getArticle = createSelector(
  [
    (state: State) => state.getFeeds.entities?.feeds,
    (state: State) => state.getFeeds.entities?.feedItems,
    (_state: State, id: string) => id,
  ],
  (
    feeds,
    feedItems,
    id,
  ): null | {
    id: string;
    pubDate: string;
    status: FeedItem["readStatus"];
    title: string;
    feed: { id: string; name: string; favicon?: string };
    url: string;
    favorite: FeedItem["favorite"];
  } => {
    if (!feeds) return null;
    if (!feedItems) return null;

    console.log("feedItems[id]", feedItems[id]);
    const { title, date, url, feedId, readStatus, favorite } = feedItems[id];
    const { name, website } = feeds[feedId];
    const favicon =
      website &&
      `https://www.google.com/s2/favicons?domain=${new URL(website).hostname}&sz=128`;
    return {
      id,
      url,
      title: DOMPurify.sanitize(title),
      pubDate: formatToPubDate(date),
      status: readStatus,
      favorite,
      feed: {
        id: feedId,
        name,
        favicon,
      },
    };
  },
);
