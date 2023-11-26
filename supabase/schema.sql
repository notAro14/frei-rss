
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."feed_items" (
    "created_at" timestamp with time zone DEFAULT "now"(),
    "url" "text" NOT NULL,
    "fk_feed_id" "uuid" NOT NULL,
    "pub_date" "date" NOT NULL,
    "title" "text" NOT NULL,
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "is_read" boolean DEFAULT false,
    "user_id" "uuid"
);

ALTER TABLE "public"."feed_items" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."feeds" (
    "created_at" timestamp with time zone DEFAULT "now"(),
    "url" "text" NOT NULL,
    "name" "text",
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid"
);

ALTER TABLE "public"."feeds" OWNER TO "postgres";

ALTER TABLE ONLY "public"."feed_items"
    ADD CONSTRAINT "article_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."feed_items"
    ADD CONSTRAINT "article_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."feed_items"
    ADD CONSTRAINT "article_url_key" UNIQUE ("url");

ALTER TABLE ONLY "public"."feeds"
    ADD CONSTRAINT "feed_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."feeds"
    ADD CONSTRAINT "feed_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."feeds"
    ADD CONSTRAINT "feed_url_key" UNIQUE ("url");

ALTER TABLE ONLY "public"."feed_items"
    ADD CONSTRAINT "feed_items_fk_feed_id_fkey" FOREIGN KEY ("fk_feed_id") REFERENCES "public"."feeds"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."feed_items"
    ADD CONSTRAINT "feed_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."feeds"
    ADD CONSTRAINT "feeds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "CRUD for authenticated user on his feed items" ON "public"."feed_items" TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

CREATE POLICY "CRUD for authenticated user on his feeds" ON "public"."feeds" TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

ALTER TABLE "public"."feed_items" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."feeds" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."feed_items" TO "anon";
GRANT ALL ON TABLE "public"."feed_items" TO "authenticated";
GRANT ALL ON TABLE "public"."feed_items" TO "service_role";

GRANT ALL ON TABLE "public"."feeds" TO "anon";
GRANT ALL ON TABLE "public"."feeds" TO "authenticated";
GRANT ALL ON TABLE "public"."feeds" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
