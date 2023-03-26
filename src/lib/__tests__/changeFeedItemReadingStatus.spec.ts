import { describe, expect, it, beforeEach } from "vitest";
import { configureStore, type State, type Store } from "src/store";
import { FeedReaderInMemoryGateway } from "src/lib/Feed/gateways/FeedReaderInMemory.gateway";
import { AuthInMemoryGateway } from "src/lib/Auth/gateways/AuthInMemory.gateway";
import {
  PRELOADED_STATE,
  MOCK,
  FEED_ITEM_ID,
  NORMALIZED_MOCK,
} from "src/lib/Feed/mocks";
import { changeFeedItemReadingStatus } from "src/lib/Feed/usecases/changeFeedItemReadingStatus";

describe("Update feed item reading status", () => {
  let store: Store;
  let initialState: State;
  beforeEach(() => {
    const feedReaderGateway = new FeedReaderInMemoryGateway(MOCK);
    const authGateway = new AuthInMemoryGateway();
    const dep = { feedReaderGateway, authGateway };
    store = configureStore(dep, PRELOADED_STATE);
    initialState = store.getState();
  });
  it("should mark a feed item as 'Read later'", async () => {
    expect(store.getState()).toEqual<State>(initialState);
    await store.dispatch(
      changeFeedItemReadingStatus({
        id: FEED_ITEM_ID,
        newStatus: "READ_LATER",
      }),
    );
    expect(store.getState()).toEqual<State>({
      ...initialState,
      getFeeds: {
        ...initialState.getFeeds,
        entities: {
          ...NORMALIZED_MOCK.entities,
          feedItems: {
            ...initialState.getFeeds.entities?.feedItems,
            [FEED_ITEM_ID]: {
              ...NORMALIZED_MOCK.entities.feedItems[FEED_ITEM_ID],
              readStatus: "READ_LATER",
            },
          },
        },
      },
    });
  });
});
