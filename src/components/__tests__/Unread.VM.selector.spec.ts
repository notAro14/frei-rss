import { test, describe, expect } from "vitest";
import { unreadVMSelector } from "src/components/views/Unread/Unread.VM.selector";
import { configureStore } from "src/store";
import {
  PRELOADED_STATE as STATE_WITH_FEEDS,
  createInMemoryDependencies,
} from "src/lib/Feed/mocks";
import { normalize } from "src/lib/Feed/utils/normalize";
import type { Feed, FeedItem } from "src/lib/Feed/models/Feed.entity";

const FEED_ITEM_1: FeedItem = {
  id: "item-1",
  url: "https://example.com/",
  title: "Article 1",
  date: "2023-12-01",
  readStatus: "UNREAD",
  content: "Lorem ipsum",
  favorite: false,
};
const FEED_ITEM_2: FeedItem = {
  id: "item-2",
  url: "https://example.com/2",
  title: "Article 2",
  date: "2023-12-01",
  readStatus: "UNREAD",
  content: "Lorem ipsum",
  favorite: false,
};
const FEED_ITEM_3: FeedItem = {
  id: "item-3",
  url: "https://example.com/3",
  title: "Article 3",
  date: "2023-11-01",
  readStatus: "UNREAD",
  content: "Lorem ipsum",
  favorite: false,
};
const FEED_ITEM_4: FeedItem = {
  id: "item-4",
  url: "https://example.com/4",
  title: "Article 4",
  date: "2023-10-01",
  readStatus: "UNREAD",
  content: "Lorem ipsum",
  favorite: false,
};

export const FEEDS: Feed[] = [
  {
    id: "11",
    name: "Foo",
    url: "https://example.com",
    feedItems: [
      FEED_ITEM_4,
      {
        id: "fsaf",
        url: "https://example.com/0",
        title: "Article 0",
        date: "2024-03-31",
        readStatus: "READ",
        content: "Lorem ipsum",
        favorite: false,
      },
      FEED_ITEM_2,
      FEED_ITEM_3,
      FEED_ITEM_1,
    ],
  },
];
const NORMALIZED_FEEDS = normalize(FEEDS);

describe("Unread.VM.selector", () => {
  test("should wait for feeds to be loaded", () => {
    const dep = createInMemoryDependencies();
    const store = configureStore(dep, {
      ...STATE_WITH_FEEDS,
      getFeeds: { status: "pending", entities: null, result: null },
    });
    expect(unreadVMSelector(store.getState())).toEqual<{
      status: "pending";
      data: null;
      error: null;
    }>({
      status: "pending",
      data: null,
      error: null,
    });
  });

  test("should select unread feed item ids sorted by publish date (recent to old)", () => {
    const dep = createInMemoryDependencies();
    const store = configureStore(dep, {
      ...STATE_WITH_FEEDS,
      getFeeds: {
        status: "fulfilled",
        entities: NORMALIZED_FEEDS.entities,
        result: NORMALIZED_FEEDS.result,
      },
    });
    const result = unreadVMSelector(store.getState());
    expect(result.status).toBe("fulfilled");
    expect(result.data).toEqual([
      // item-2 and item-1 have the same date, so they appear in the same order as in the original array
      FEED_ITEM_2.id,
      FEED_ITEM_1.id,
      FEED_ITEM_3.id,
      FEED_ITEM_4.id,
    ]);
  });
});
