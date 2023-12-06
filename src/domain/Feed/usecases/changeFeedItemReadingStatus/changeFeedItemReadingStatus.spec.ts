import { configureStore, State, Store } from "src/store";
import { FeedReaderInMemoryGateway } from "src/domain/Feed/gateways/FeedReaderInMemory.gateway";
import {
  PRELOADED_STATE,
  MOCK,
  FEED_ITEM_ID,
  NORMALIZED_MOCK,
} from "src/domain/Feed/mocks";
import { changeFeedItemReadingStatus } from "./changeFeedItemReadingStatus";

describe("Update feed item reading status", () => {
  let store: Store;
  let gateway: FeedReaderInMemoryGateway;
  let initialState: State;
  beforeEach(() => {
    gateway = new FeedReaderInMemoryGateway(MOCK);
    store = configureStore({ feedReaderGateway: gateway }, PRELOADED_STATE);
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
