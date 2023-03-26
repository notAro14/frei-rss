alter table "public"."feed_items" drop constraint "unique_feeditemurl_userid";

drop index if exists "public"."unique_feeditemurl_userid";

CREATE UNIQUE INDEX unique_feeditemurl_userid_feed_id ON public.feed_items USING btree (url, user_id, fk_feed_id);

alter table "public"."feed_items" add constraint "unique_feeditemurl_userid_feed_id" UNIQUE using index "unique_feeditemurl_userid_feed_id";