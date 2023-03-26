import { createClient } from "@supabase/supabase-js";
import { Database } from "src/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) throw new Error("supabaseUrl must be defined");
if (!supabaseKey) throw new Error("supabaseKey must be defined");

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);