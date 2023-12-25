import useSound from "use-sound";
export const useWithSound = (audioSource: string) => {
  const [play, { pause }] = useSound(audioSource);

  return {
    playSound: play,
    pauseSound: pause,
  };
};
