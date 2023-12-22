import "@radix-ui/themes/styles.css";
import "src/globals.css";

import { ReactNode } from "react";
import { Metadata } from "next";
import { Container } from "@radix-ui/themes";
import { Providers } from "src/components/Providers";
import { Header } from "src/components/Header";
import { AddFeedForm } from "src/components/AddFeedForm";

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
            <AddFeedForm />
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
