import "@radix-ui/themes/styles.css";

import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { Theme } from "@radix-ui/themes";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import { store } from "src/store/config";

import { AuthGuard } from "src/components/AuthGuard";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <ThemeProvider attribute="class">
        <Theme accentColor={"iris"} panelBackground="translucent">
          <Provider store={store}>
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
            <Toaster />
          </Provider>
        </Theme>
      </ThemeProvider>
    </>
  );
}

function Meta() {
  return (
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
  );
}
