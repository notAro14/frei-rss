import type { Feed, FeedItem } from "src/Feed/entities/Feed";
import type { FeedReaderGateway } from "./FeedReader.gateway";
import { supabase } from "src/utils/supabaseClient";

export class FeedReaderProductionGateway implements FeedReaderGateway {
  async retrieveFeedList(): Promise<Feed[]> {
    const { data, error } = await supabase
      .from("feeds")
      .select(
        `
        id,
        name,
        url,
        feed_items(
          id,
          pub_date,
          title,
          url,
          is_read
        )
      `
      )
      .neq("name", null)
      .order("name");
    if (error) throw new Error("Failed to get feed");
    return data.map(({ id, name, url, feed_items: feedItems }) => {
      const common = {
        id,
        name: name ?? "Title is unknown",
        website: url,
      };

      if (!feedItems)
        return {
          ...common,
          feedItems: [],
        };

      if (Array.isArray(feedItems))
        return {
          ...common,
          feedItems: feedItems.map(
            ({ id, pub_date: date, title, url, is_read: isRead }) => ({
              id,
              date,
              title,
              url,
              isRead: isRead ?? false,
            })
          ),
        };

      return {
        ...common,
        feedItems: [
          {
            id: feedItems.id,
            date: feedItems.pub_date,
            title: feedItems.title,
            url: feedItems.url,
            isRead: feedItems.is_read ?? false,
          },
        ],
      };
    });
  }
  async registerFeed(url: string): Promise<Feed> {
    const { error, data } = await supabase
      .from("feeds")
      .upsert({ url })
      .select()
      .maybeSingle();
    if (error || !data) throw new Error("Failed to register feed");

    return {
      id: data.id,
      feedItems: [],
      name: data.name ?? "",
      website: data.url,
    };
  }
  async updateFeedItemReadingStatus(
    feedItemId: string,
    status: "READ" | "UNREAD"
  ): Promise<FeedItem> {
    const { data, error } = await supabase
      .from("feed_items")
      .update({
        is_read: status === "READ",
      })
      .eq("id", feedItemId)
      .select()
      .maybeSingle();
    if (error || !data) throw new Error("Failed to mark feed item as read");

    return {
      id: data.id,
      url: data.url,
      title: data.title,
      date: data.pub_date,
      isRead: data.is_read ?? false,
    };
  }
}
