export interface Feed {
  description: string;
  title: string;
  feedUrl: string;
  link: string;
  items: FeedItem[];
}

interface FeedItem {
  link: string;
  title: string;
  content?: string;
  isoDate?: string;
}
