import type { ReactNode } from "react";
import { Container } from "@radix-ui/themes";
import useGetFeeds from "src/hooks/useGetFeeds";
import { Header } from "src/components/Header";

export function Layout(props: { children: ReactNode }) {
  useGetFeeds();
  const { children } = props;
  return (
    <Container size={"2"} p={"4"}>
      <Header />
      {children}
    </Container>
  );
}
