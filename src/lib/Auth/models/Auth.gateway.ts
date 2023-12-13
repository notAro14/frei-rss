import type { User } from "src/lib/Auth/models/User.entity";

export type OnAuthStateChangedListener = (user: User | null) => void;

export interface AuthGateway {
  signInWithSocial(
    provider: "github",
  ): Promise<{ ok: true; error: null } | { ok: false; error: string }>;
  onAuthStateChangedListener(listener: OnAuthStateChangedListener): () => void;
}
