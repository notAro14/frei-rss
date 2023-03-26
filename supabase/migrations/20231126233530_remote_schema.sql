create table "public"."feed_items" (
    "created_at" timestamp with time zone default now(),
    "url" text not null,
    "fk_feed_id" uuid not null,
    "pub_date" date not null,
    "title" text not null,
    "id" uuid not null default uuid_generate_v4(),
    "is_read" boolean default false,
    "user_id" uuid
);


alter table "public"."feed_items" enable row level security;

create table "public"."feeds" (
    "created_at" timestamp with time zone default now(),
    "url" text not null,
    "name" text,
    "id" uuid not null default uuid_generate_v4(),
    "user_id" uuid
);


alter table "public"."feeds" enable row level security;

CREATE UNIQUE INDEX article_id_key ON public.feed_items USING btree (id);

CREATE UNIQUE INDEX article_pkey ON public.feed_items USING btree (id);

CREATE UNIQUE INDEX article_url_key ON public.feed_items USING btree (url);

CREATE UNIQUE INDEX feed_id_key ON public.feeds USING btree (id);

CREATE UNIQUE INDEX feed_pkey ON public.feeds USING btree (id);

CREATE UNIQUE INDEX feed_url_key ON public.feeds USING btree (url);

alter table "public"."feed_items" add constraint "article_pkey" PRIMARY KEY using index "article_pkey";

alter table "public"."feeds" add constraint "feed_pkey" PRIMARY KEY using index "feed_pkey";

alter table "public"."feed_items" add constraint "article_id_key" UNIQUE using index "article_id_key";

alter table "public"."feed_items" add constraint "article_url_key" UNIQUE using index "article_url_key";

alter table "public"."feed_items" add constraint "feed_items_fk_feed_id_fkey" FOREIGN KEY (fk_feed_id) REFERENCES feeds(id) ON DELETE CASCADE not valid;

alter table "public"."feed_items" validate constraint "feed_items_fk_feed_id_fkey";

alter table "public"."feed_items" add constraint "feed_items_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."feed_items" validate constraint "feed_items_user_id_fkey";

alter table "public"."feeds" add constraint "feed_id_key" UNIQUE using index "feed_id_key";

alter table "public"."feeds" add constraint "feed_url_key" UNIQUE using index "feed_url_key";

alter table "public"."feeds" add constraint "feeds_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."feeds" validate constraint "feeds_user_id_fkey";

create policy "CRUD for authenticated user on his feed items"
on "public"."feed_items"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "CRUD for authenticated user on his feeds"
on "public"."feeds"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



