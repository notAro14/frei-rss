"use client";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "src/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) throw new Error("supabaseUrl must be defined");
if (!supabaseKey) throw new Error("supabaseKey must be defined");

export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseKey);

export type FeedInsert = Database["public"]["Tables"]["feeds"]["Insert"];
export type FeedItemInsert =
  Database["public"]["Tables"]["feed_items"]["Insert"];
