import { normalize, schema } from "normalizr";
import type {
  NormalizedFeedItem,
  NormalizedFeed,
  Feed,
} from "src/Feed/entities/Feed";

const feedItem = new schema.Entity("feedItems", {}, { idAttribute: "url" });
const feed = new schema.Entity(
  "feeds",
  {
    feedItems: [feedItem],
  },
  { idAttribute: "website" }
);
const feeds = new schema.Array(feed);

export function normalizeFeed(data: Feed[]) {
  return normalize<
    any,
    {
      feeds: NormalizedFeed;
      feedItems: NormalizedFeedItem;
    }
  >(data, feeds);
}
