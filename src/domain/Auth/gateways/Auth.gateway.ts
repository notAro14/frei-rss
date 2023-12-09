import type { User } from "src/domain/Auth/entities/User";

export type OnAuthStateChangedListener = (user: User | null) => void;

export interface AuthGateway {
  signInWithSocial(provider: "github"): Promise<void>;
  onAuthStateChangedListener(listener: OnAuthStateChangedListener): () => void;
}
