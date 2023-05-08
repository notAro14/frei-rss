import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import ThemeProvider from "src/contexts/ThemeProvider";
import Layout from "src/components/Layout/Layout";

import { store } from "src/store/config";

import "src/styles/reset.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
