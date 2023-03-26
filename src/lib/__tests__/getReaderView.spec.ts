import { describe, it, expect } from "vitest";
import { type State, configureStore } from "src/store";
import {
  PRELOADED_STATE,
  FEED_ITEM_ID,
  createInMemoryDependencies,
} from "src/lib/Feed/mocks";
import { getReaderView } from "src/lib/Feed/usecases/getReaderView";

describe("Reader View", () => {
  it("should get reader view for a feed item from its url", async () => {
    const dep = createInMemoryDependencies();
    const store = configureStore(dep, PRELOADED_STATE);
    const initialState = store.getState();
    await store.dispatch(getReaderView(FEED_ITEM_ID));
    expect(store.getState()).toEqual<State>({
      ...initialState,
      getFeeds: {
        ...initialState.getFeeds,
        entities: {
          ...initialState.getFeeds.entities!,
          feedItems: {
            ...initialState.getFeeds.entities!.feedItems,
            [FEED_ITEM_ID]: {
              ...initialState.getFeeds.entities!.feedItems[FEED_ITEM_ID],
              fullContent: "<p>Fake reader view</p>",
            },
          },
        },
      },
      getReaderView: {
        [FEED_ITEM_ID]: {
          status: "fulfilled",
          error: null,
          data: {
            fullContent: "<p>Fake reader view</p>",
          },
        },
      },
    });
  });

  it("should wait before getting the reader view", async () => {
    const dep = createInMemoryDependencies();
    const store = configureStore(dep, PRELOADED_STATE);
    const initialState = store.getState();
    store.dispatch(getReaderView(FEED_ITEM_ID));
    expect(store.getState()).toEqual<State>({
      ...initialState,
      getReaderView: {
        [FEED_ITEM_ID]: {
          status: "pending",
          error: null,
          data: null,
        },
      },
    });
  });
});
