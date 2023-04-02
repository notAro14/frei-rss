import { useRef } from "react";
import { useForm } from "react-hook-form";
import { dispatch, feedReaderApi } from "src/store/config";
import { useSelector } from "src/store";
import * as styles from "./AddFeedForm.css";

const FEED_URL = "feedUrl";

export default function AddFeedForm() {
  const ref = useRef("");
  const mutationState = useSelector(
    feedReaderApi.endpoints.registerFeed.select(ref.current)
  );

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
          const { requestId, unwrap } = dispatch(
            feedReaderApi.endpoints.registerFeed.initiate(data.feedUrl, {
              track: true,
            })
          );
          data.feedUrl;
          ref.current = requestId;
          await unwrap();
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
      <button
        className={styles.button}
        disabled={mutationState.isLoading}
        type="submit"
      >
        Register feed
      </button>
    </form>
  );
}
