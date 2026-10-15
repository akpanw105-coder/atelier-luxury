import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bdeoqfznozkruoqwovhf.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkZW9xZnpub3prcnVvcXdvdmhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NDQ4MTgsImV4cCI6MjEwNzMyMDgxOH0.RQpv9jaDUdZT4dUAXOseioUO1C7flOAb3zlljVwnuS8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
