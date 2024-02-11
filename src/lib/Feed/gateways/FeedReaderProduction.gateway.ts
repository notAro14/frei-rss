import type {
  Feed,
  FeedFreshlyParsed,
  FeedItem,
} from "src/lib/Feed/models/Feed.entity";
import type {
  FeedReaderGateway,
  RegisterFeedRes,
  GatewayRes,
} from "src/lib/Feed/models/FeedReader.gateway";
import {
  supabase,
  type FeedInsert,
  type FeedItemInsert,
} from "src/utils/supabaseClient";
import { mapFeedItemStatusFromRemote } from "src/lib/Feed/utils/mapFeedItemStatusFromRemote";

export class FeedReaderProductionGateway implements FeedReaderGateway {
  async retrieveFeedList(): Promise<Feed[]> {
    const { data, error } = await supabase
      .from("feeds")
      .select(
        `
        id,
        name,
        url,
        website,
        feed_items(
          id,
          pub_date,
          title,
          url,
          content,
          status
        )
      `,
      )
      .neq("name", null)
      .order("name");
    if (error) throw new Error("Failed to get feed");
    return data.map(({ id, name, url, feed_items: feedItems, website }) => {
      const common = {
        id,
        name: name ?? "Title is unknown",
        url,
        website: website ?? undefined,
      };

      if (!feedItems)
        return {
          ...common,
          feedItems: [],
        };

      return {
        ...common,
        feedItems: feedItems.map(
          ({ id, pub_date: date, title, url, content, status }) => ({
            id,
            date,
            title,
            url,
            readStatus: mapFeedItemStatusFromRemote(status),
            content,
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
      url: feed.url,
      user_id: userId,
      website: feed.website,
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
      content: a.content ?? "",
      id: a.id,
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
    status: FeedItem["readStatus"],
  ): Promise<FeedItem> {
    const { data, error } = await supabase
      .from("feed_items")
      .update({
        status: ((status) => {
          switch (status) {
            case "READ":
              return "read";
            case "UNREAD":
              return "unread";
            case "READ_LATER":
              return "read_later";
            default:
              throw new Error("Invalid feed status");
          }
        })(status),
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
      readStatus: mapFeedItemStatusFromRemote(data.status),
      content: data.content || "",
    };
  }

  async deleteFeed({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<{ feedId: string; feedName: string }> {
    const { error, data } = await supabase
      .from("feeds")
      .delete()
      .filter("id", "eq", id)
      .filter("user_id", "eq", userId)
      .select("*")
      .maybeSingle();
    if (error) throw new Error("Failed to remove feed");
    if (!data) throw new Error("Failed to remove feed");
    return {
      feedId: id,
      feedName: data?.name ?? "Unknown feed",
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
      id: a.id,
    }));

    const { error } = await supabase.from("feed_items").upsert(insert);
    return error ? { ok: false } : { ok: true };
  }

  async getReaderView(url: string): GatewayRes<string> {
    const res = await fetch("/api/get-reader-view", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
    if (res.ok) {
      const html = (await res.json()) as { ok: true; data: string };
      return { ok: true, error: null, data: html.data };
    } else return { ok: false, data: null, error: "Failed to get reader view" };
  }
}
