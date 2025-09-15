import { Audio } from "expo-av";
import { useEffect, useRef } from "react";

export default function useBellSound() {
  const sound = useRef<Audio.Sound | null>(null);

  async function playBell() {
    try {
      const { sound: playbackObj } = await Audio.Sound.createAsync(
        require("../assets/sounds/boxing_bell.mp3")
      );
      sound.current = playbackObj;
      await playbackObj.playAsync();
    } catch (error) {
      console.error("Erro ao tocar som:", error);
    }
  }

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  return { playBell };
}
