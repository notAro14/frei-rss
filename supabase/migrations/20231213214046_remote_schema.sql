alter table "auth"."identities" drop constraint "identities_pkey";

drop index if exists "auth"."identities_pkey";

alter table "auth"."identities" add column "provider_id" text not null;

alter table "auth"."identities" alter column "id" set default gen_random_uuid();

alter table "auth"."identities" alter column "id" set data type uuid using "id"::uuid;

alter table "auth"."sessions" add column "ip" inet;

alter table "auth"."sessions" add column "refreshed_at" timestamp without time zone;

alter table "auth"."sessions" add column "tag" text;

alter table "auth"."sessions" add column "user_agent" text;

CREATE UNIQUE INDEX identities_provider_id_provider_unique ON auth.identities USING btree (provider_id, provider);

CREATE UNIQUE INDEX identities_pkey ON auth.identities USING btree (id);

alter table "auth"."identities" add constraint "identities_pkey" PRIMARY KEY using index "identities_pkey";

alter table "auth"."identities" add constraint "identities_provider_id_provider_unique" UNIQUE using index "identities_provider_id_provider_unique";


