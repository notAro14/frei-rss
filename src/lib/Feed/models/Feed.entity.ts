export interface Feed {
  id: string;
  name: string;
  feedItems: FeedItem[];
  website: string;
  content?: string;
}

export interface NormalizedFeed {
  [key: string]: Omit<Feed, "feedItems"> & { feedItems: string[] };
}
export interface NormalizedFeedItem {
  [key: string]: FeedItem;
}
export interface FeedItem {
  id: string;
  date: string;
  title: string;
  url: string;
  readStatus: "UNREAD" | "READ" | "READ_LATER";
}
export type FeedItemFreshlyParsed = Omit<FeedItem, "id" | "readStatus">;
export type FeedFreshlyParsed = Omit<Feed, "feedItems" | "id"> & {
  feedItems: FeedItemFreshlyParsed[];
};
