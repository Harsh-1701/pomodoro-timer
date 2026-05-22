import { useEffect, useRef } from "react";

import rainSound from "../assets/raindrop.mp3";

export default function AmbientSound({
  volume,
  isRunning,
}) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;

      if (isRunning) {
        audioRef.current
          .play()
          .catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [volume, isRunning]);

  return (
    <audio
      ref={audioRef}
      src={rainSound}
      loop
    />
  );
}