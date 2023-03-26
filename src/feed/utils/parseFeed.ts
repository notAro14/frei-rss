import Parser from "rss-parser";
import type { Feed } from "../Feed";

const parser: Parser = new Parser();

export default async function parseFeed(url: string) {
  return parser.parseURL(url) as Promise<Feed>;
}
