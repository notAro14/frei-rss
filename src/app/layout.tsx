import "@radix-ui/themes/styles.css";
import "src/globals.css";

import { ReactNode } from "react";
import { Container } from "@radix-ui/themes";
import { Metadata } from "next";
import { Providers } from "src/components/Providers";
import { Header } from "src/components/Header";
import { ScrollToTopButton } from "src/components/ScrollToTopButton";

export const metadata: Metadata = {
  title: "Frei RSS",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Container height={"100%"} size={"3"} p={"4"}>
            <Header />
            <ScrollToTopButton />
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
