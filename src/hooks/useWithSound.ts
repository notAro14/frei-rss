import { useRef, useEffect, useCallback } from "react";
export const useWithSound = (audioSource: string) => {
  const soundRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    soundRef.current = new Audio(audioSource);
  }, [audioSource]);

  const playSound = useCallback(() => {
    soundRef.current?.play();
  }, []);

  const pauseSound = useCallback(() => {
    soundRef.current?.pause();
  }, []);

  return {
    playSound,
    pauseSound,
  };
};
