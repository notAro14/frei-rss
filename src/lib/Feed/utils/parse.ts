import Parser from "rss-parser";
import type {
  FeedFreshlyParsed,
  FeedItemFreshlyParsed,
} from "src/lib/Feed/models/Feed.entity";
import { z } from "zod";

const rawFeedSchema = z.object({
  feedUrl: z.string().optional(),
  title: z.string(),
  content: z.string().optional(),
  items: z
    .object({
      title: z.string(),
      link: z.string().optional(),
      id: z.string().optional(),
      isoDate: z.string().optional(),
      pubDate: z.string().optional(),
    })
    .array(),
});

const parser: Parser = new Parser();
export async function parseFeed(url: string): Promise<FeedFreshlyParsed> {
  const rawFeedUnckecked = await parser.parseURL(url);
  const rawFeed = rawFeedSchema.parse(rawFeedUnckecked);
  const INIT: FeedItemFreshlyParsed[] = [];
  return {
    name: rawFeed.title,
    website: url,
    content: rawFeed.content,
    feedItems: rawFeed.items.reduce((acc, i) => {
      const pubDate = i.isoDate ?? (i.pubDate as string);
      if (!i.id && !i.link) return acc;
      const url = i.link ?? i.id ?? ""; // "" just for TS
      return acc.concat({
        date: pubDate,
        title: i.title,
        url,
      });
    }, INIT),
  };
}
