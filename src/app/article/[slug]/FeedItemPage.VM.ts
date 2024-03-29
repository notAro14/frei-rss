export interface FeedItemPageVM {
  title: string;
  status: "UNREAD" | "READ" | "READ_LATER";
  feed: {
    id: string;
    name: string;
    favicon?: string;
  };
  pubDate: string;
  url: string;
  id: string;
  summary: string;
  favorite: boolean;
}

export interface ReaderViewVM {
  fullContent: string;
}
