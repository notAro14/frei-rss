import { ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

import { light, dark } from "src/styles/theme.css";

export default function ThemeProvider(props: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{ light, dark }}
    >
      {props.children}
    </NextThemeProvider>
  );
}
