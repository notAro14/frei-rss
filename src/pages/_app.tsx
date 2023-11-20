import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import ThemeProvider from "src/contexts/ThemeProvider";
import Layout from "src/components/Layout/Layout";

import { store } from "src/store/config";

import "src/styles/reset.css";
import "src/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </ClerkProvider>
  );
}
