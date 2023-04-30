export interface Feed {
  title: string;
  url: string;
  items: FeedItem[];
}

export interface FeedItem {
  title: string;
  url: string;
  pubDate: string;
}
