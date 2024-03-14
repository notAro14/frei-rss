import type { Res } from "src/types/response";
import type { FeedItem } from "src/lib/Feed/models/Feed.entity";

export type ArticleCardVM = Res<{
  id: string;
  pubDate: string;
  status: FeedItem["readStatus"];
  title: string;
  href: string;
  feed: { id: string; name: string; favicon?: string; href: string };
  url: string;
  favorite: FeedItem["favorite"];
}>;
