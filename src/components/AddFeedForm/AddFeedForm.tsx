import { useForm } from "react-hook-form";
import * as styles from "./AddFeedForm.css";
import { useRegisterFeed } from "src/FeedReader/hooks";

const FEED_URL = "feedUrl";

export default function AddFeedForm() {
  const [mutate, { isLoading }] = useRegisterFeed();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ feedUrl: string }>({
    defaultValues: { [FEED_URL]: "" },
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await mutate(data.feedUrl).unwrap();
          reset();
          alert("Feed added successfully");
        } catch (e) {
          console.error(e);
          alert("Failed to register feed");
        }
      })}
      className={styles.form}
    >
      <div className={styles.field}>
        <label className={styles.label} htmlFor={FEED_URL}>
          Feed URL
          <input
            className={styles.input}
            {...register(FEED_URL, { required: "A feed url is required" })}
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
      <button className={styles.button} disabled={isLoading} type="submit">
        Register feed
      </button>
    </form>
  );
}
