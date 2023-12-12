import { useState } from "react";
import { Wand2, Github, Rss } from "lucide-react";
import {
  TextField,
  Button,
  Heading,
  Text,
  Container,
  Flex,
  Separator,
} from "@radix-ui/themes";
import toast from "react-hot-toast";

import { supabase } from "src/utils/supabaseClient";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const emailSignInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Can not be empty" })
    .email("Must be a valid email address"),
});
type EmailSignInForm = z.infer<typeof emailSignInFormSchema>;

export function Auth() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSignInForm>({
    resolver: zodResolver(emailSignInFormSchema),
  });

  const handleEmailSignIn: SubmitHandler<EmailSignInForm> = async (data) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
    });
    if (error) toast.error(error.message);
    else toast.success("Check your email for the login link!");

    setLoading(false);
  };

  return (
    <Container size={"2"}>
      <Flex direction={"column"} gap={"6"}>
        <Heading
          as="h1"
          id="logo"
          size={{ initial: "6", xs: "8" }}
          className="flex items-center gap-rx-2"
        >
          <Rss size={"1em"} /> FreiRSS
        </Heading>
        <Flex direction={"column"} gap={"4"} asChild>
          <form onSubmit={handleSubmit(handleEmailSignIn)}>
            <Flex direction={"column"} gap={"2"}>
              <Text as="label" htmlFor="email">
                Sign in via magic link with your email below
              </Text>
              <TextField.Input
                placeholder="Your mail"
                {...register("email")}
                size={"3"}
              />
              {errors.email && (
                <Text role="alert" color="crimson">
                  {errors.email.message}
                </Text>
              )}
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
    if (error) toast.error(error.message);
    setLoading(false);
  }
}
