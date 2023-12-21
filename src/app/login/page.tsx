"use client";
import { Github, Rss } from "lucide-react";
import { Button, Heading, Flex, Grid } from "@radix-ui/themes";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "src/store";
import { signInWithGithub } from "src/lib/Auth/usecases/signInWithSocial";
import { useEffect } from "react";

export default function Login() {
  const signInError = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (signInError) toast.error(signInError);
  }, [signInError]);

  return (
    <Grid className="h-lvh h-100dvh place-items-center">
      <Flex direction={"column"} align={"center"} gap={"8"}>
        <Heading
          as="h1"
          id="logo"
          size={{ initial: "8", xs: "9" }}
          className="flex items-center gap-rx-2"
        >
          <Rss size={"1em"} /> FreiRSS
        </Heading>

        <Button size={"3"} onClick={() => dispatch(signInWithGithub())}>
          <Github size={16} /> Sign in With Github
        </Button>
      </Flex>
    </Grid>
  );
}
