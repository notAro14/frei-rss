alter table "public"."feed_items" alter column "content" set default ''::text;

alter table "public"."feed_items" alter column "content" set not null;