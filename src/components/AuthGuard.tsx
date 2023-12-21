"use client";
import { type ReactNode } from "react";

import { useSelector } from "src/store";

import { Auth } from "src/components/Auth";
import useGetFeeds from "src/hooks/useGetFeeds";

export function AuthGuard(props: { children: ReactNode }) {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Auth />;

  return <GetFeedsTrigger>{props.children}</GetFeedsTrigger>;
}

function GetFeedsTrigger(props: { children: ReactNode }) {
  useGetFeeds();
  return <>{props.children}</>;
}
