import { setupStore, State, Store } from "src/store";
import type { FeedReaderGateway } from "src/Feed/gateways/FeedReader.gateway";
import { registerFeed } from "./registerFeed";
import { FeedReaderInMemoryGateway } from "src/Feed/gateways/FeedReaderInMemory.gateway";
import type { Feed } from "src/Feed/entities/Feed";

const FEED_URL = "https://example.com/rss";
const MOCK: Feed[] = [
  {
    id: "1",
    name: "My feed",
    website: FEED_URL,
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

describe("Register feed", () => {
  let gateway: FeedReaderGateway;
  let store: Store;
  let initialState: State;

  beforeEach(() => {
    gateway = new FeedReaderInMemoryGateway(MOCK);
    store = setupStore({ feedReaderGateway: gateway });
    initialState = store.getState();
  });

  it("should wait for registering the feed", function () {
    store.dispatch(registerFeed(FEED_URL));
    expect(store.getState()).toEqual<State>({
      ...initialState,
      registerFeed: {
        status: "pending",
      },
    });
  });

  it("should have registered the feed", async function () {
    await store.dispatch(registerFeed(FEED_URL));
    expect(store.getState()).toEqual<State>({
      ...initialState,
      registerFeed: {
        status: "success",
      },
    });
  });

  it("should not allow registering the same feed twice", async function () {
    await store.dispatch(registerFeed(FEED_URL));
    await store.dispatch(registerFeed(FEED_URL));
    expect(store.getState()).toEqual<State>({
      ...initialState,
      registerFeed: {
        status: "error",
      },
    });
  });
});
