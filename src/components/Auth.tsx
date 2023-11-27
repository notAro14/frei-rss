import { FormEvent, useState } from "react";
import { TextField, Button, Heading, Text, Box } from "@radix-ui/themes";

import { supabase } from "src/utils/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (event: FormEvent) => {
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
  };

  return (
    <Box>
      <Heading>Supabase + React</Heading>
      <Text>Sign in via magic link with your email below</Text>
      <form onSubmit={handleLogin}>
        <TextField.Root>
          <TextField.Input
            type="email"
            placeholder="Your email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </TextField.Root>
        <Button type="submit" disabled={loading}>
          {loading ? <span>Loading</span> : <span>Send magic link</span>}
        </Button>
      </form>
    </Box>
  );
}
