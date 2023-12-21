import "@radix-ui/themes/styles.css";
import "src/globals.css";

import { ReactNode } from "react";
import { Providers } from "src/components/Providers";
import { Container } from "@radix-ui/themes";
import { Header } from "src/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frei RSS",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Container size={"2"} p={"4"}>
            <Header />
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
