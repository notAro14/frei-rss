import { describe, it, expect } from "vitest";
import type {
  FeedItemPageVM,
  ReaderViewVM,
} from "src/app/article/[slug]/FeedItemPage.VM";
import {
  FEED_ITEM_ID,
  FEED_ITEM,
  PRELOADED_STATE,
  createInMemoryDependencies,
  FEED_ID,
  FEED_ITEM_PUB_DATE,
  FEED_NAME,
} from "src/lib/Feed/mocks";
import { type State, configureStore } from "src/store";
import { feedItemPageSelector } from "./FeedItemPage.selector";
import { readerViewSelector } from "src/components/ReaderView.selector";
import type { Res } from "src/types/response";

const INITIAL_STATE: State = {
  ...PRELOADED_STATE,
  getReaderView: {
    [FEED_ITEM_ID]: {
      status: "fulfilled",
      data: {
        fullContent: "<p>Fake reader view</p>",
      },
      error: null,
    },
  },
  getFeeds: {
    ...PRELOADED_STATE.getFeeds,
    entities: {
      ...PRELOADED_STATE.getFeeds.entities!,
      feedItems: {
        [FEED_ITEM_ID]: {
          ...PRELOADED_STATE.getFeeds.entities!.feedItems[FEED_ITEM_ID],
          fullContent: "<p>Fake reader view</p>",
        },
      },
    },
  },
};

describe("Feed Item Page selector", () => {
  it("should select feed item", () => {
    const dep = createInMemoryDependencies();
    const store = configureStore(dep, INITIAL_STATE);
    expect(feedItemPageSelector(store.getState(), FEED_ITEM_ID)).toEqual<
      Res<FeedItemPageVM>
    >({
      status: "fulfilled",
      error: null,
      data: {
        title: FEED_ITEM.title,
        status: FEED_ITEM.readStatus,
        feed: {
          id: FEED_ID,
          name: FEED_NAME,
        },
        pubDate: FEED_ITEM_PUB_DATE,
        url: FEED_ITEM.url,
        id: FEED_ITEM_ID,
        summary: FEED_ITEM.content,
        favorite: false,
      },
    });
  });

  it("should select feed item reader view", () => {
    const dep = createInMemoryDependencies();
    const store = configureStore(dep, INITIAL_STATE);
    expect(readerViewSelector(store.getState(), FEED_ITEM_ID)).toEqual<
      Res<ReaderViewVM>
    >({
      status: "fulfilled",
      error: null,
      data: {
        fullContent: "<p>Fake reader view</p>",
      },
    });
  });
});
