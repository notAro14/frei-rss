import { useReducer, useEffect } from "react";

export function useEnableOnce() {
  return useReducer(() => true, false);
}

export function useIsBrowser() {
  const [isEnable, enableOnce] = useEnableOnce();
  useEffect(() => {
    enableOnce();
  }, [enableOnce]);
  return isEnable;
}
