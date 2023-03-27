import { Feed, FeedItem } from "./Feed";
import type { FeedGateway } from "./FeedGateway";
import { supabase } from "src/utils/supabaseClient";

export class FeedGatewayProduction implements FeedGateway {
  async retrieve(): Promise<Feed[]> {
    const { data, error } = await supabase
      .from("feed")
      .select(
        `
        url,
        name,
        article(
          title,
          id,
          url,
          pub_date
        )
      `
      )
      .neq("name", null)
      .order("name");
    if (error) throw new Error("Failed to get feed");
    return data.map(({ name, url, article }) => {
      const title = name ?? "Unknown title";
      if (!article)
        return {
          title,
          url,
          items: [] as FeedItem[],
        };

      return {
        title,
        url,
        items: Array.isArray(article)
          ? article.map((a) => ({
              title: a.title,
              pubDate: a.pub_date,
              url: a.url,
            }))
          : [
              {
                title: article.title,
                url: article.url,
                pubDate: article.pub_date,
              },
            ],
      };
    });
  }
}
