import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "src/utils/supabaseClient";
import * as styles from "./AddFeedForm.css";

const FEED_URL = "feedUrl";

export default function AddFeedForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ feedUrl: string }>({
    defaultValues: { [FEED_URL]: "" },
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: async (url: string) => {
      const { error } = await supabase.from("feed").upsert({ url }).select();
      if (error) throw new Error("Failed to add feed");
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["feed"] });
      reset();
      alert("Feed added");
    },
    onError() {
      alert("Failed to add feed");
    },
  });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutate(data.feedUrl);
      })}
      className={styles.form}
    >
      <div className={styles.field}>
        <label className={styles.label} htmlFor={FEED_URL}>
          Feed URL
          <input
            className={styles.input}
            {...register(FEED_URL, { required: "This is required" })}
            id={FEED_URL}
            type="url"
          />
        </label>
        {errors[FEED_URL]?.message && (
          <p className={styles.error} role="alert">
            {errors[FEED_URL].message}
          </p>
        )}
      </div>
      <button disabled={isLoading} type="submit">
        Add
      </button>
    </form>
  );
}
