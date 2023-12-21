import type {
  Feed,
  FeedFreshlyParsed,
  FeedItem,
} from "src/lib/Feed/models/Feed.entity";
import type {
  FeedReaderGateway,
  RegisterFeedRes,
} from "src/lib/Feed/models/FeedReader.gateway";
import {
  supabase,
  type FeedInsert,
  type FeedItemInsert,
} from "src/utils/supabaseClient";

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
  async registerFeed({
    feed,
    userId,
  }: {
    feed: Feed;
    userId: string;
  }): Promise<RegisterFeedRes> {
    const feedInsert: FeedInsert = {
      id: feed.id,
      name: feed.name,
      url: feed.website,
      user_id: userId,
    };
    const { error: feedInsertError, data: feedInserted } = await supabase
      .from("feeds")
      .upsert(feedInsert)
      .select()
      .maybeSingle();
    if (feedInsertError) {
      return { ok: false, error: feedInsertError.message };
    }
    if (!feedInserted) return { ok: false, error: "Failed to register feed" };

    const articlesInsert: FeedItemInsert[] = feed.feedItems.map((a) => ({
      fk_feed_id: feedInserted.id,
      url: a.url,
      title: a.title,
      pub_date: a.date,
      user_id: userId,
    }));

    const { error: feedItemsInsertError } = await supabase
      .from("feed_items")
      .upsert(articlesInsert);

    if (feedItemsInsertError) {
      return { ok: false, error: feedItemsInsertError.message };
    }

    return { ok: true, data: feed };
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

  async parse(url: string): Promise<FeedFreshlyParsed | string> {
    const response = await fetch("/api/parse-feed", {
      method: "POST",
      body: JSON.stringify({
        url,
      }),
    });
    const json = (await response.json()) as
      | {
          data: FeedFreshlyParsed;
          ok: true;
        }
      | {
          ok: false;
          error: string;
        };
    return json.ok ? json.data : json.error;
  }
  async saveArticles(args: {
    articles: FeedItem[];
    userId: string;
    feedId: string;
  }): Promise<{ ok: boolean }> {
    const { articles, userId, feedId } = args;
    const insert: FeedItemInsert[] = articles.map((a) => ({
      fk_feed_id: feedId,
      url: a.url,
      title: a.title,
      pub_date: a.date,
      user_id: userId,
    }));

    const { error } = await supabase.from("feed_items").upsert(insert);
    return error ? { ok: false } : { ok: true };
  }
}
