// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import parseFeed from "src/feed/utils/parseFeed";
import { supabase } from "src/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { data, error } = await supabase.from("feed").select();

      if (error || !data)
        return res.status(500).json({ msg: "Internal server error" });

      const feed = await Promise.all(data.map(({ url }) => parseFeed(url)));
      feed.sort((a, b) => {
        const nameA = a.title;
        const nameB = b.title;
        if (!nameA || !nameB) return 0;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      feed.forEach(({ items }) => {
        items.sort((a, b) => {
          const dateA = a.isoDate;
          const dateB = b.isoDate;
          if (!dateA || !dateB) return 0;
          if (dateA < dateB) return 1;
          if (dateA > dateB) return -1;
          return 0;
        });
      });
      return res.status(200).json(feed);

    default:
      return res.status(400).json({ msg: "Unknown method" });
  }
}
