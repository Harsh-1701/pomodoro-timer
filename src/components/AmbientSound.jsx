import { useEffect, useRef } from "react";

import rainSound from "../assets/raindrop.mp3";

export default function AmbientSound({
  volume,
}) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <audio
      ref={audioRef}
      src={rainSound}
      autoPlay
      loop
    />
  );
}