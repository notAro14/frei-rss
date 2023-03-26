// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Feed } from "src/feed/Feed";
import parseFeed from "src/feed/utils/parseFeed";
import { supabase } from "src/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await supabase.from("feed").select();
  if (!data) return res.status(500).json({ msg: "Failed to retrieve feed" });

  const feed: Feed[] = [];
  const settled = await Promise.allSettled(
    data.map(({ url }) => parseFeed(url))
  );
  settled.forEach((r) => {
    if (r.status === "rejected") return;
    feed.push(r.value);
    feed.sort(({ title: a }, { title: b }) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  });
  const promises = feed.map((f) => {
    const items = f.items.map((i) => ({
      title: i.title,
      pub_date: i.isoDate ?? "",
      url: i.link,
      fk_feed_id: f.feedUrl,
    }));
    return supabase.from("article").upsert(items);
  });
  await Promise.all(promises);

  return res.status(200).end("Feed parsed");
}
