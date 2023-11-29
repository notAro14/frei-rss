import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { Theme } from "@radix-ui/themes";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import { store } from "src/store/config";
import { supabase } from "src/utils/supabaseClient";

import "@radix-ui/themes/styles.css";
import Auth from "src/components/Auth";
import { useDispatch } from "src/store";
import { signIn, signOut } from "src/domain/Auth/auth.reducer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Frei RSS</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider attribute="class">
          <Theme accentColor={"iris"} panelBackground="translucent">
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          </Theme>
        </ThemeProvider>
      </Provider>
    </>
  );
}

function AuthGuard(props: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) alert("Failed to get session");
      else setSession(data.session);
    }

    getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        dispatch(
          signIn({
            id: session.user.id,
            email: session.user.email ?? "Unknown email",
          })
        );
      } else {
        dispatch(signOut());
      }
    });
  }, [dispatch]);

  if (!session) return <Auth />;

  return <>{props.children}</>;
}
