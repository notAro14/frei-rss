import { supabase } from "src/utils/supabaseClient";
import type {
  AuthGateway,
  OnAuthStateChangedListener,
} from "src/lib/Auth/models/Auth.gateway";
import { type User } from "src/lib/Auth/models/User.entity";

export class AuthSupabase implements AuthGateway {
  async signInWithSocial(provider: "github" = "github"): Promise<void> {
    await supabase.auth.signInWithOAuth({ provider });
  }

  onAuthStateChangedListener(listener: OnAuthStateChangedListener): () => void {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evt, session) => {
      const user: User | null = session
        ? { id: session.user.id, email: session.user.email ?? "" }
        : null;
      listener(user);
    });
    return subscription.unsubscribe;
  }
}
