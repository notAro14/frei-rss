alter table "public"."feed_items" drop constraint "article_url_key";

alter table "public"."feeds" drop constraint "feed_url_key";

drop index if exists "public"."article_url_key";

drop index if exists "public"."feed_url_key";

CREATE UNIQUE INDEX unique_feeditemurl_userid ON public.feed_items USING btree (url, user_id);

CREATE UNIQUE INDEX unique_feedurl_userid ON public.feeds USING btree (url, user_id);

alter table "public"."feed_items" add constraint "unique_feeditemurl_userid" UNIQUE using index "unique_feeditemurl_userid";

alter table "public"."feeds" add constraint "unique_feedurl_userid" UNIQUE using index "unique_feedurl_userid";


