import { setupStore, State, Store } from "src/store";
import { FeedReaderInMemoryGateway } from "src/domain/Feed/gateways/FeedReaderInMemory.gateway";
import { PRELOADED_STATE, MOCK, FEED_ITEM_ID } from "src/domain/Feed/mocks";

describe("Label as read later", () => {
  let store: Store;
  let gateway: FeedReaderInMemoryGateway;
  let initialState: State;
  beforeEach(() => {
    gateway = new FeedReaderInMemoryGateway(MOCK);
    store = setupStore({ feedReaderGateway: gateway }, PRELOADED_STATE);
    initialState = store.getState();
  });
  it("should label a feed item as 'Read later'", async () => {
    expect(store.getState()).toEqual<State>(initialState);
    // await store.dispatch(labelAsReadLater());
    // expect(store.getState()).toEqual<State>({
    //   ...initialState,
    //   getFeeds: {
    //     ...initialState.getFeeds,
    //     entities: {
    //       ...initialState.getFeeds.entities,
    //       feedItems: {
    //         ...initialState.getFeeds.entities?.feedItems,
    //         [FEED_ITEM_ID]: {
    //           ...initialState.getFeeds.entities?.feedItems[FEED_ITEM_ID],
    //           readingStatus: "READ_LATER",
    //         },
    //       },
    //     },
    //   },
    // });
  });
});
