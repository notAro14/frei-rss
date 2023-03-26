import { Database } from "src/types/supabase";

export interface Feed {
  id: string;
  name: string;
  feedItems: FeedItem[];
  url: string;
  website?: string;
}

export interface NormalizedFeed {
  [key: string]: Omit<Feed, "feedItems"> & { feedItems: string[] };
}
export interface NormalizedFeedItem {
  [key: string]: FeedItem & {
    feedId: string;
  };
}
export interface FeedItem {
  id: string;
  date: string;
  title: string;
  url: string;
  content: string;
  fullContent?: string;
  readStatus: "UNREAD" | "READ" | "READ_LATER";
}
export type FeedItemFreshlyParsed = Omit<FeedItem, "id" | "readStatus">;
export type FeedFreshlyParsed = Omit<Feed, "feedItems" | "id"> & {
  feedItems: FeedItemFreshlyParsed[];
};

export type FeedItemInsert =
  Database["public"]["Tables"]["feed_items"]["Insert"];
