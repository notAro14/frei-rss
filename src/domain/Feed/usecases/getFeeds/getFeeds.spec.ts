import { setupStore, State, Store } from "src/store";
import type { FeedReaderGateway } from "src/domain/Feed/gateways/FeedReader.gateway";
import { getFeeds } from "./getFeeds";
import { FeedReaderInMemoryGateway } from "src/domain/Feed/gateways/FeedReaderInMemory.gateway";
import type { Feed } from "src/domain/Feed/entities/Feed";
import { normalize } from "./utils";

const MOCK: Feed[] = [
  {
    id: "1",
    name: "My feed",
    website: "https://example.com/rss",
    feedItems: [
      {
        id: "11",
        url: "https://example.com/article-title",
        title: "Article title",
        date: "2023-03-31",
        isRead: false,
      },
    ],
  },
];
const NORMALIZED_MOCK = normalize(MOCK);

describe("Get feeds", () => {
  let gateway: FeedReaderGateway;
  let store: Store;
  let initialState: State;

  beforeEach(() => {
    gateway = new FeedReaderInMemoryGateway(MOCK);
    store = setupStore({ feedReaderGateway: gateway });
    initialState = store.getState();
  });

  it("should have no feeds initially", function () {
    expect(store.getState()).toEqual<State>({
      ...initialState,
      getFeeds: {
        result: null,
        entities: null,
        isFulfilled: false,
      },
    });
  });

  it("should retrieve feeds", async () => {
    await store.dispatch(getFeeds());
    expect(store.getState()).toEqual<State>({
      ...initialState,
      getFeeds: {
        result: NORMALIZED_MOCK.result,
        entities: NORMALIZED_MOCK.entities,
        isFulfilled: true,
      },
    });
  });
});