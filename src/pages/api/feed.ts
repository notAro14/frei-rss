// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import parseFeed from "src/feed/utils/parseFeed";
import { supabase } from "src/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const { data, error } = await supabase.from("feed").select();

      if (error || !data)
        return res.status(500).json({ msg: "Internal server error" });

      const feed = (
        await Promise.allSettled(data.map(({ url }) => parseFeed(url)))
      )
        .filter((x) => x.status === "fulfilled")
        .map((result) => {
          return result.status === "fulfilled" ? result.value : result.reason;
        });
      feed.sort((a, b) => {
        const nameA = a.title;
        const nameB = b.title;
        if (!nameA || !nameB) return 0;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      return res.status(200).json(feed);
    }

    case "POST": {
      const url = req.body.url as string | undefined;
      if (!url) return res.status(400).json({ msg: "Bad request" });
      const { error } = await supabase.from("feed").upsert({ url });
      if (error) return res.status(500).json({ msg: "Internal server error" });
      return res.status(201).json({ msg: "Feed URL added" });
    }

    default: {
      return res.status(400).json({ msg: "Unknown method" });
    }
  }
}
