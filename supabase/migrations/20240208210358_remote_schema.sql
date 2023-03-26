create type "public"."feed_item_status" as enum ('read', 'unread', 'read_later');

alter table "public"."feed_items" add column "favorite" boolean default false;

alter table "public"."feed_items" add column "status" feed_item_status default 'unread'::feed_item_status;


