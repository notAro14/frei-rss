export interface Feed {
  id: string;
  name: string;
  feedItems: FeedItem[];
  website: string;
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
}
