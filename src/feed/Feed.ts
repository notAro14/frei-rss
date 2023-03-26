export interface Feed {
  title: string;
  url: string;
  items: FeedItem[];
}

export interface FeedItem {
  url: string;
  title: string;
  pubDate: string;
}
