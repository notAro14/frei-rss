import type { Feed, FeedItem } from "src/FeedReader/models";
import type { FeedReaderGateway } from "./FeedReader.gateway";
import { supabase } from "src/utils/supabaseClient";
import { isAfter } from "src/utils/date";

export class FeedReaderProductionGateway implements FeedReaderGateway {
  async retrieveFeedList(): Promise<Feed[]> {
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
          ? article
              .map((a) => ({
                title: a.title,
                pubDate: a.pub_date,
                url: a.url,
              }))
              .sort((articleA, articleB) => {
                if (isAfter(articleA.pubDate, articleB.pubDate)) return -1;
                if (isAfter(articleB.pubDate, articleA.pubDate)) return 1;
                return 0;
              })
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
  async registerFeed(url: string): Promise<Feed> {
    const { error, data } = await supabase
      .from("feed")
      .upsert({ url })
      .select()
      .maybeSingle();
    if (error || !data) throw new Error("Failed to register feed");

    return {
      title: data.name ?? "",
      url: data.url,
      items: [],
    };
  }
}
