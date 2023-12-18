import type { NextApiRequest, NextApiResponse } from "next";
import { FeedFreshlyParsed } from "src/lib/Feed/models/Feed.entity";
import { parseFeed } from "src/lib/Feed/utils/parse";

type Data =
  | {
      data: FeedFreshlyParsed;
      ok: true;
    }
  | {
      ok: false;
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { url } = JSON.parse(req.body) as { url: string };
  if (req.method === "POST") {
    try {
      const feed = await parseFeed(url);
      res.status(200).json({ ok: true, data: feed });
    } catch (e) {
      res.status(500).json({ ok: false, error: "Failed to parse feed" });
    }
    return;
  }
  res.status(403).json({ ok: false, error: "Method not allowed" });
}
