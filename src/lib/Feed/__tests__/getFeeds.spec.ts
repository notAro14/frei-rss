import { configureStore, State, Store } from "src/store";
import { getFeeds } from "src/lib/Feed/usecases/getFeeds";
import { FeedReaderInMemoryGateway } from "src/lib/Feed/gateways/FeedReaderInMemory.gateway";
import { AuthInMemoryGateway } from "src/lib/Auth/gateways/AuthInMemory.gateway";
import type { Feed } from "src/lib/Feed/models/Feed.entity";
import { normalize } from "src/lib/Feed/utils/normalize";

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
        readStatus: "UNREAD",
      },
    ],
  },
];
const NORMALIZED_MOCK = normalize(MOCK);

describe("Get feeds", () => {
  let store: Store;
  let initialState: State;

  beforeEach(() => {
    const feedReaderGateway = new FeedReaderInMemoryGateway(MOCK);
    const authGateway = new AuthInMemoryGateway();
    const dep = { feedReaderGateway, authGateway };
    store = configureStore(dep);
    initialState = store.getState();
  });

  it("should have no feeds initially", function () {
    expect(store.getState()).toEqual<State>({
      ...initialState,
      getFeeds: {
        result: null,
        entities: null,
        status: "idle",
      },
    });
  });

  it("should wait for feeds", async () => {
    store.dispatch(getFeeds());
    expect(store.getState()).toEqual<State>({
      ...initialState,
      getFeeds: {
        result: null,
        entities: null,
        status: "pending",
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
        status: "fulfilled",
      },
    });
  });
});
