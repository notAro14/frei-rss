import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { toast } from "sonner";
import { createSelector } from "@reduxjs/toolkit";
import Image from "next/image";

import { type State, useDispatch, useSelector } from "src/store";
import {
  signInWithGithub,
  signInWithGoogle,
} from "src/lib/Auth/usecases/signInWithSocial";
import googleLogo from "public/images/google-logo.svg";
import styles from "./SignIn.module.scss";

const authSelector = createSelector(
  [
    (state: State) => state.auth.status,
    (state: State) => state.auth.user,
    (state: State) => state.auth.error,
  ],
  (status, user, error) => {
    return {
      isPending: status === "pending" && !user,
      error: error,
    };
  },
);

export function SignIn() {
  const { isPending, error } = useSelector(authSelector);
  const dispatch = useDispatch();
  // const [illustration] = useState(() => Math.floor(Math.random() * 4) + 1);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <section className="grid h-dvh place-items-center p-4">
      <Flex
        direction={{ initial: "column-reverse", sm: "row" }}
        align={"center"}
        className="gap-10"
      >
        <main className="flex flex-1 flex-col gap-9">
          <header className="flex flex-col items-center gap-3">
            <Heading
              className="flex flex-col items-center gap-2"
              as="h1"
              size={"8"}
            >
              <Image
                src={"/images/logo.png"}
                width={64}
                height={64}
                className="rounded-item"
                alt=""
              />
              <Text>FreiRSS</Text>
            </Heading>
            <Text align={"center"}>Clean and minimalistic feed reader.</Text>
          </header>

          <div className="flex flex-col gap-3">
            <Button
              className={styles.github}
              size={"3"}
              disabled={isPending}
              onClick={() => dispatch(signInWithGithub())}
            >
              <FaGithub size={"1em"} /> Continue with Github
            </Button>
            <Button
              className={styles.google}
              size={"3"}
              disabled={isPending}
              onClick={() => dispatch(signInWithGoogle())}
            >
              <Image src={googleLogo} priority alt="Sign in with Google" />{" "}
              Continue with Google
            </Button>
          </div>
        </main>
        <div className="relative aspect-video w-40 max-w-full sm:w-72">
          <Image
            fill
            priority
            className="object-cover p-0"
            src={`/images/signin.svg`}
            alt=""
          />
        </div>
      </Flex>
    </section>
  );
}
