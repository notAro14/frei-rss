import Parser from "rss-parser";
import { z } from "zod";
import axios from "axios";
import type {
  FeedFreshlyParsed,
  FeedItemFreshlyParsed,
} from "src/lib/Feed/models/Feed.entity";

const rawFeedSchema = z.object({
  feedUrl: z.string().optional(),
  link: z.string().optional(),
  title: z.string(),
  items: z
    .object({
      title: z.string().optional(),
      link: z.string().optional(),
      id: z.string().optional(),
      isoDate: z.string().optional(),
      pubDate: z.string().optional(),
      content: z.string().optional(),
    })
    .array(),
});

// https://github.com/rbren/rss-parser/issues/129
const parser: Parser = new Parser();
axios.defaults.headers.common["User-Agent"] =
  "Frei RSS (+https://freirss.aroandriamaro.com)";
export async function parseFeed(url: string): Promise<FeedFreshlyParsed> {
  try {
    const res = await axios.get<string>(url, {
      responseType: "text",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        Accept:
          "application/rss+xml, application/rdf+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.5",
      },
    });
    const xml = res.data;
    const rawFeedUnckecked = await parser.parseString(xml);
    const rawFeed = rawFeedSchema.parse(rawFeedUnckecked);
    const INIT: FeedItemFreshlyParsed[] = [];
    return {
      name: rawFeed.title,
      url,
      website: rawFeed.link,
      feedItems: rawFeed.items.reduce((acc, i) => {
        const pubDate = i.isoDate ?? (i.pubDate as string);
        if (!i.id && !i.link) return acc;
        const url = i.link ?? i.id ?? "#"; // "" just for TS
        return acc.concat({
          date: pubDate,
          content: i.content ?? "",
          title: i.title ?? "Unknown title",
          url,
        });
      }, INIT),
    };
  } catch (err) {
    throw new Error("Failed to get xml string", { cause: err });
  }
}
