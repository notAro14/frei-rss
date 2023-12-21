"use client";
import type { ReactNode } from "react";
import { Container } from "@radix-ui/themes";
import { Header } from "src/components/Header";

export function Layout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <Container size={"2"} p={"4"}>
      <Header />
      {children}
    </Container>
  );
}
