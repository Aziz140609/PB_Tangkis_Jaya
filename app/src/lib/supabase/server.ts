import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function hasValidEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  return url.startsWith("http") && url !== "http://your-supabase-url";
}

export async function createClient() {
  if (!hasValidEnv()) {
    throw new Error(
      "Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL in .env.local"
    );
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — ignore
          }
        },
      },
    }
  );
}
