import { useRef, useEffect } from "react";
export const useWithSound = (audioSource: string) => {
  const soundRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    soundRef.current = new Audio(audioSource);
  }, [audioSource]);

  const playSound = () => {
    soundRef.current?.play();
  };

  const pauseSound = () => {
    soundRef.current?.pause();
  };

  return {
    playSound,
    pauseSound,
  };
};
