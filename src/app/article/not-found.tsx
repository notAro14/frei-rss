import { Text, Link } from "@radix-ui/themes";
import NextLink from "next/link";

export default async function NotFound() {
  return (
    <Text>
      Oh no you are lost, go back to{" "}
      <Link asChild>
        <NextLink href={"/"}>home.</NextLink>
      </Link>
    </Text>
  );
}
