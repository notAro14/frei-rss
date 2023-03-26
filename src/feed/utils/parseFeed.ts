import Parser from "rss-parser";
// import { z } from "zod";
import type { Feed } from "../Feed";

const parser: Parser = new Parser();

interface RawFeed {
  feedUrl: string;
  title: string;
  items: {
    title: string;
    link: string;
    isoDate?: string;
    pubDate?: string;
  }[];
}

export default async function parseFeed(url: string): Promise<Feed> {
  const rawFeed = (await parser.parseURL(url)) as RawFeed;
  return {
    title: rawFeed.title,
    items: rawFeed.items.map((i) => {
      const pubDate = i.isoDate ?? (i.pubDate as string);
      return {
        title: i.title,
        url: i.link,
        pubDate,
      };
    }),
    url,
  };
}
