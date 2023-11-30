import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { Theme } from "@radix-ui/themes";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import toast, { Toaster } from "react-hot-toast";

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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Provider store={store}>
        <ThemeProvider attribute="class">
          <Theme accentColor={"iris"} panelBackground="translucent">
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
            <Toaster />
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
          })
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
