import "src/styles/reset.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { themeClass as light, dark } from "src/styles/theme.css";
import { store } from "src/store/config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        value={{ light, dark }}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
