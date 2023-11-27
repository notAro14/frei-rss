import Head from "next/head";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { Theme } from "@radix-ui/themes";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import { store } from "src/store/config";
import { supabase } from "src/utils/supabaseClient";

import "@radix-ui/themes/styles.css";
import Auth from "src/components/Auth";

export default function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getSession() {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();

      if (error) alert("Failed to get session");
      else setSession(data.session);

      setLoading(false);
    }

    getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return;
  }, []);

  if (loading) return null;

  return (
    <>
      <Head>
        <title>Frei RSS</title>
      </Head>
      <Provider store={store}>
        <Theme>{session ? <Component {...pageProps} /> : <Auth />}</Theme>
      </Provider>
    </>
  );
}
