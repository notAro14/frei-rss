import type {
  AuthGateway,
  OnAuthStateChangedListener,
} from "src/lib/Auth/models/Auth.gateway";

export class AuthInMemoryGateway implements AuthGateway {
  async signInWithSocial(
    _provider: "github",
  ): Promise<{ ok: true; error: null } | { ok: false; error: string }> {
    return { ok: true, error: null };
  }
  onAuthStateChangedListener(
    _listener: OnAuthStateChangedListener,
  ): () => void {
    return () => {};
  }
  async signOut(): Promise<void> {}
}
