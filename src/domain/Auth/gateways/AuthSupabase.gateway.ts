import { supabase } from "src/utils/supabaseClient";
import type {
  AuthGateway,
  OnAuthStateChangedListener,
} from "src/domain/Auth/gateways/Auth.gateway";
import { type User } from "src/domain/Auth/entities/User";

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
