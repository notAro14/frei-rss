import { type ReactNode, useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import toast from "react-hot-toast";

import { useDispatch } from "src/store";
import { supabase } from "src/utils/supabaseClient";
import { signIn, signOut } from "src/domain/Auth/auth.reducer";

import { Auth } from "src/components/Auth";

export function AuthGuard(props: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) toast.error("Failed to get session");
      else setSession(data.session);
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        dispatch(
          signIn({
            id: session.user.id,
            email: session.user.email ?? "Unknown email",
          }),
        );
      } else {
        dispatch(signOut());
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  if (!session) return <Auth />;

  return <>{props.children}</>;
}
