import { normalize as _normalize, schema } from "normalizr";
import type {
  NormalizedFeedItem,
  NormalizedFeed,
  Feed,
} from "src/lib/Feed/entities/Feed";

const feedItem = new schema.Entity("feedItems");
const feed = new schema.Entity("feeds", {
  feedItems: [feedItem],
});
const feeds = new schema.Array(feed);

export function normalize(data: Feed[]) {
  return _normalize<
    any,
    {
      feeds: NormalizedFeed;
      feedItems: NormalizedFeedItem;
    }
  >(data, feeds);
}
