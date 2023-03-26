// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import parseFeed from "src/feed/utils/parseFeed";
import { supabase } from "src/utils/supabaseClient";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await supabase.from("feed").select();
  if (!data) return res.status(500).json({ msg: "Failed to retrieve feed" });

  const errors: any = [];
  data.forEach(async (d) => {
    const feed = await parseFeed(d.url);
    await supabase.from("feed").update({ name: feed.title }).eq("url", d.url);
    const items = feed.items.map(({ title, pubDate: pub_date, url }) => ({
      title,
      pub_date,
      url,
      fk_feed_id: feed.url,
    }));
    const { error } = await supabase.from("article").upsert(items).select();
    errors.push(error);
  });

  return res
    .status(200)
    .json({
      errors,
      msg: errors.length ? "Feed parsed with errors" : "Feed parsed",
    });
}
