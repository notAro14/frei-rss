import { FormEvent, useState } from "react";
import { Wand2, Github } from "lucide-react";
import {
  TextField,
  Button,
  Heading,
  Text,
  Container,
  Flex,
  Separator,
} from "@radix-ui/themes";

import { supabase } from "src/utils/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <Container size={"2"}>
      <Flex direction={"column"} gap={"6"}>
        <Heading size={"8"}>Frei RSS - Sign In</Heading>
        <Flex direction={"column"} gap={"4"} asChild>
          <form onSubmit={handleLogin}>
            <Flex direction={"column"} gap={"2"}>
              <Text as="label" htmlFor="email">
                Sign in via magic link with your email below
              </Text>
              <TextField.Input
                size={"3"}
                type="email"
                id="email"
                placeholder="Your mail"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Flex>
            <Button size={"3"} type="submit" disabled={loading}>
              {loading ? (
                <span>Loading</span>
              ) : (
                <>
                  <Wand2 size={16} />
                  Send magic link
                </>
              )}
            </Button>
          </form>
        </Flex>
        <Flex align={"center"} justify={"center"} gap={"4"}>
          <Separator size={"3"} />
          <Text size={"2"}>Or</Text>
          <Separator size={"3"} />
        </Flex>
        <Button size={"3"} disabled={loading} onClick={signInWithGithub}>
          <Github size={16} /> Sign in With Github
        </Button>
      </Flex>
    </Container>
  );

  async function signInWithGithub() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      alert(error.message);
    } else {
      // alert("Check your email for the login link!");
    }
    setLoading(false);
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  }
}
