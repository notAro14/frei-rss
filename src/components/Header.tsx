import { ReactNode } from "react";
import Link from "next/link";
import { Flex, Link as RdxLink } from "@radix-ui/themes";
import Image from "next/image";
import { ProfileMenu } from "src/components/ProfileMenu";

export function HeaderLayout(props: { children: ReactNode }) {
  return (
    <Flex mb={"6"} justify={"between"} mt={"4"}>
      <RdxLink
        asChild
        id="logo"
        weight={"bold"}
        size={{ initial: "6", xs: "8" }}
        className="flex items-center gap-rx-2 text-current no-underline"
      >
        <Link href={"/"}>
          <Image
            src={"/images/logo.png"}
            width={32}
            height={32}
            className="rounded-item"
            alt=""
          />{" "}
          FreiRSS
        </Link>
      </RdxLink>
      {props.children}
    </Flex>
  );
}

export function Header() {
  return (
    <HeaderLayout>
      <ProfileMenu />
    </HeaderLayout>
  );
}
