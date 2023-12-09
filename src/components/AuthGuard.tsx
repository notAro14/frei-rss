import { type ReactNode } from "react";

import { useSelector } from "src/store";

import { Auth } from "src/components/Auth";

export function AuthGuard(props: { children: ReactNode }) {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Auth />;

  return <>{props.children}</>;
}
