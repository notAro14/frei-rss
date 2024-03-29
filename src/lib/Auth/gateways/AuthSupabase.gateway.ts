import { supabase } from "src/utils/supabaseClient";
import type {
  AuthGateway,
  OnAuthStateChangedListener,
} from "src/lib/Auth/models/Auth.gateway";
import { type User } from "src/lib/Auth/models/User.entity";

export class AuthSupabase implements AuthGateway {
  async signInWithSocial(
    provider: "github" | "google" = "github",
  ): Promise<{ ok: true; error: null } | { ok: false; error: string }> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) return { error: error.message, ok: false };
    return { ok: true, error: null };
  }

  onAuthStateChangedListener(listener: OnAuthStateChangedListener): () => void {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evt, session) => {
      const user: User | null = session
        ? {
            id: session.user.id,
            email: session.user.user_metadata.email ?? session.user.email ?? "",
            fullName: session.user.user_metadata.full_name,
            avatarUrl: session.user.user_metadata.avatar_url,
          }
        : null;
      listener(user);
    });
    return subscription.unsubscribe;
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }
}
