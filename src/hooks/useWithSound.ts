import useSound from "use-sound";
export const useWithSound = (audioSource: string) => {
  const [play, { pause }] = useSound(audioSource, { volume: 0.5 });

  return {
    playSound: play,
    pauseSound: pause,
  };
};
