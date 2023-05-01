export interface Feed {
  id: string;
  name: string;
  feedItems: FeedItem[];
  website: string;
}

export interface FeedItem {
  id: string;
  date: string;
  title: string;
  url: string;
}
