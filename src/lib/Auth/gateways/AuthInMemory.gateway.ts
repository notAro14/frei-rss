import type { AuthGateway } from "src/lib/Auth/models/Auth.gateway";

export class AuthInMemoryGateway implements AuthGateway {
  async signInWithSocial(): Promise<
    { ok: true; error: null } | { ok: false; error: string }
  > {
    return { ok: true, error: null };
  }
  onAuthStateChangedListener(): () => void {
    return () => {};
  }
  async signOut(): Promise<void> {}
}
