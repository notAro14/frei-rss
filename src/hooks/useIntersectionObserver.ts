import { useEffect, RefObject } from "react";

export function useIntersectionObserver(
  ref: RefObject<HTMLDivElement>,
  callback: (instance?: IntersectionObserver) => void,
) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(function (entries, instance) {
      if (entries[0].isIntersecting) {
        callback(instance);
      }
    });
    observer.observe(ref.current);

    return function () {
      observer.disconnect();
    };
  }, [ref, callback]);
}
