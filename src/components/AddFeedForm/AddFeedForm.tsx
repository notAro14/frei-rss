import { useForm } from "react-hook-form";
import * as styles from "./AddFeedForm.css";
import { useDispatch, useSelector } from "src/store";
import { registerFeed } from "src/domain/Feed/usecases/registerFeed/registerFeed";
import toast from "react-hot-toast";

const FEED_URL = "feedUrl";

export default function AddFeedForm() {
  const { status } = useSelector((state) => state.registerFeed);
  const dispatch = useDispatch();

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
          await dispatch(registerFeed(data.feedUrl)).unwrap();
          reset();
          toast.success("Feed added successfully");
        } catch (e) {
          toast.error("Unable to register feed");
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
        disabled={status === "pending"}
        type="submit"
      >
        Register feed
      </button>
    </form>
  );
}
