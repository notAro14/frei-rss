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

  console.log(session?.user.email);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return;
  }, []);

  return (
    <Provider store={store}>
      <Theme>{session ? <Component {...pageProps} /> : <Auth />}</Theme>
    </Provider>
  );
}
