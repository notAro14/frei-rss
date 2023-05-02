import { setupStore } from "src/store";
import { FeedReaderProductionGateway } from "src/Feed/gateways/FeedReaderProduction.gateway";
import { FeedReaderInMemoryGateway } from "src/Feed/gateways/FeedReaderInMemory.gateway";

const OFFLINE = process.env.NEXT_PUBLIC_OFFLINE === "true";

const feedReaderGateway = OFFLINE
  ? new FeedReaderInMemoryGateway([
      {
        id: "1",
        website: "https://example.com/",
        name: "Example Dot Com",
        feedItems: [
          {
            id: "11",
            title: "Hello World Article",
            url: "https://example.com/hello-world/",
            date: "2023-01-01",
          },
        ],
      },
    ])
  : new FeedReaderProductionGateway();
export const store = setupStore({ feedReaderGateway });

export const { dispatch } = store;
