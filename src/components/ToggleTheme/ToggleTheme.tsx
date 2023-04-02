import { useIsBrowser } from "src/hooks";
import { useCallback } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import * as styles from "./ToggleTheme.css";

export default function ToggleTheme() {
  const { setTheme, resolvedTheme } = useTheme();
  const toggleTheme = useCallback(() => {
    resolvedTheme === "light" && setTheme("dark");
    resolvedTheme === "dark" && setTheme("light");
  }, [resolvedTheme, setTheme]);
  const isBrowser = useIsBrowser();
  if (!isBrowser) return null;
  return (
    <button className={styles.toggleTheme} onClick={toggleTheme}>
      {resolvedTheme === "light" && (
        <SunIcon fill="currentColor" width={30} height={30} />
      )}
      {resolvedTheme === "dark" && (
        <MoonIcon fill="currentColor" width={30} height={30} />
      )}
    </button>
  );
}
