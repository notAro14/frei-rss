import { INITIAL_STATE } from "src/store";
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
        readStatus: "UNREAD",
      },
    ],
  },
];

export const NORMALIZED_MOCK = normalize(MOCK);
export const PRELOADED_STATE = {
  registerFeed: INITIAL_STATE.registerFeed,
  getFeeds: {
    isFulfilled: true,
    entities: NORMALIZED_MOCK.entities,
    result: NORMALIZED_MOCK.result,
  },
  removeFeed: INITIAL_STATE.removeFeed,
};
