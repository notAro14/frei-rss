import type { Feed } from "./entities/Feed";
import { normalize } from "./usecases/getFeeds/utils";

export const FEED_URL = "https://example.com/rss";
export const FEED_ID = "1";
export const FEED_ITEM_ID = "11";
export const FEED_ITEM_URL = "https://example.com/article-title";
export const MOCK: Feed[] = [
  {
    id: FEED_ID,
    name: "My feed",
    website: FEED_URL,
    feedItems: [
      {
        id: FEED_ITEM_ID,
        url: FEED_ITEM_URL,
        title: "Article title",
        date: "2023-03-31",
        isRead: false,
      },
    ],
  },
];

export const NORMALIZED_MOCK = normalize(MOCK);
