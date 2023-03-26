import Parser from "rss-parser";

const parser: Parser = new Parser();

export default async function parseFeed(url: string) {
  return parser.parseURL(url);
}
