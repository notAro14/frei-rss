import { configureStore, State, Store } from "src/store";
import { registerFeed } from "src/lib/Feed/usecases/registerFeed";
import { FeedReaderInMemoryGateway } from "src/lib/Feed/gateways/FeedReaderInMemory.gateway";
import { AuthInMemoryGateway } from "src/lib/Auth/gateways/AuthInMemory.gateway";
import type { Feed } from "src/lib/Feed/models/Feed.entity";
import { PRELOADED_STATE } from "src/lib/Feed/mocks";

const FEED_URL = "https://example.com/rss";
const MOCK: Feed[] = [
  {
    id: "1",
    name: "My feed",
    url: FEED_URL,
    feedItems: [
      {
        id: "11",
        url: "https://example.com/article-title",
        title: "Article title",
        date: "2023-03-31",
        readStatus: "UNREAD",
        content: "",
      },
    ],
  },
];

describe("Register feed", () => {
  let store: Store;
  let initialState: State;

  beforeEach(() => {
    const feedReaderGateway = new FeedReaderInMemoryGateway(MOCK);
    const authGateway = new AuthInMemoryGateway();
    const dep = { feedReaderGateway, authGateway };
    store = configureStore(dep, {
      ...PRELOADED_STATE,
      auth: { user: { id: "1234", email: "" }, error: null },
    });
    initialState = store.getState();
  });

  it("should wait for registering the feed", function () {
    store.dispatch(registerFeed(FEED_URL));
    expect(store.getState()).toEqual<State>({
      ...initialState,
      registerFeed: {
        status: "pending",
        message: null,
      },
    });
  });

  // @TODO fix this test by adding parse feed fake
  it.skip("should have registered the feed", async function () {
    await store.dispatch(registerFeed("https://new.feed"));
    expect(store.getState()).toEqual<State>({
      ...initialState,
      registerFeed: {
        status: "success",
        message: null,
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
        message: "This feed is already registered",
      },
    });
  });
});
