import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://bdlgslrzrtkybxdpnfhu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkbGdzbHJ6cnRreWJ4ZHBuZmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1NDE5MzMsImV4cCI6MjAyMzExNzkzM30.uhre32oPdJxpefYc6LinFnaa2GJ-d6YB52DZW4O4Fwc",
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);

