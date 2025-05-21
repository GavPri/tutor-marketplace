"use client";

import { useEffect, useState } from "react";
import { useUser, useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export function useUserProfile() {
  const { user } = useUser();
  const { session } = useSession();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user || !session) return;

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${await session.getToken()}`,
            },
          },
        }
      );

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        setError(error.message);
        setProfile(null);
      } else {
        setProfile(data);
      }

      setLoading(false);
    }

    fetchProfile();
  }, [user, session]);

  return { profile, loading, error };
}
