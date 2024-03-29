import { Database } from "src/types/supabase";

export type Feed = {
  id: string;
  name: string;
  feedItems: FeedItem[];
  url: string;
  website?: string;
};

export type NormalizedFeed = {
  [key: string]: Omit<Feed, "feedItems"> & { feedItems: string[] };
};
export type NormalizedFeedItem = {
  [key: string]: FeedItem & {
    feedId: string;
  };
};
export type FeedItem = {
  id: string;
  date: string;
  title: string;
  url: string;
  content: string;
  fullContent?: string;
  readStatus: "UNREAD" | "READ" | "READ_LATER";
  favorite: boolean;
};
export type FeedItemFreshlyParsed = Omit<
  FeedItem,
  "id" | "readStatus" | "favorite"
>;
export type FeedFreshlyParsed = Omit<Feed, "feedItems" | "id"> & {
  feedItems: FeedItemFreshlyParsed[];
};

export type FeedItemInsert =
  Database["public"]["Tables"]["feed_items"]["Insert"];
