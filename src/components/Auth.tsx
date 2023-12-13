import { useState } from "react";
import { Github, Rss } from "lucide-react";
import {
  Button,
  Heading,
  Text,
  Container,
  Flex,
  Separator,
  Box,
  Grid,
} from "@radix-ui/themes";
import toast from "react-hot-toast";

import { supabase } from "src/utils/supabaseClient";

export function Auth() {
  const [loading, setLoading] = useState(false);

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

        <Button size={"3"} disabled={loading} onClick={signInWithGithub}>
          <Github size={16} /> Sign in With Github
        </Button>
      </Flex>
    </Grid>
  );

  async function signInWithGithub() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) toast.error(error.message);
    setLoading(false);
  }
}
