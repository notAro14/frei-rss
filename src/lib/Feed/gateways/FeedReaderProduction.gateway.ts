import type { Feed, FeedItem } from "src/lib/Feed/models/Feed.entity";
import type { FeedReaderGateway } from "src/lib/Feed/models/FeedReader.gateway";
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
      `,
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

      return {
        ...common,
        feedItems: feedItems.map(
          ({ id, pub_date: date, title, url, is_read: isRead }) => ({
            id,
            date,
            title,
            url,
            readStatus: isRead ? "READ" : "UNREAD",
          }),
        ),
      };
    });
  }
  async registerFeed(url: string, userId: string): Promise<Feed> {
    const { error, data } = await supabase
      .from("feeds")
      .upsert({ url, user_id: userId })
      .select()
      .maybeSingle();
    if (error || !data) {
      if (error?.code === "23505")
        throw new Error("Feed URL already registered");

      throw new Error("Failed to register feed");
    }

    return {
      id: data.id,
      feedItems: [],
      name: data.name ?? "",
      website: data.url,
    };
  }
  async updateFeedItemReadingStatus(
    feedItemId: string,
    status: "READ" | "UNREAD",
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
      readStatus: data.is_read ? "READ" : "UNREAD",
    };
  }

  async deleteFeed(id: string): Promise<{ feedId: string }> {
    const { error } = await supabase.from("feeds").delete().eq("id", id);

    if (error) throw new Error("Failed to remove feed");
    return {
      feedId: id,
    };
  }
}
