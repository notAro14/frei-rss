import type {
  AuthGateway,
  OnAuthStateChangedListener,
} from "src/lib/Auth/models/Auth.gateway";

export class AuthInMemoryGateway implements AuthGateway {
  async signInWithSocial(_provider: "github"): Promise<void> {}
  onAuthStateChangedListener(
    _listener: OnAuthStateChangedListener,
  ): () => void {
    return () => {};
  }
}
