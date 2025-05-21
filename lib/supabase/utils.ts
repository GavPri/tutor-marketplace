"use client";

import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";

export function useClerkSupabaseClient() {
  const { session } = useSession();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        headers: async () => {
          const token = await session?.getToken();
          return token ? { Authorization: `Bearer ${token}` } : {};
        },
      },
    }
  );

  return supabase;
}
