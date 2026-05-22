import rainVideo from "../assets/rain.mp4";

export default function BackgroundVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="background-video"
    >
      <source
        src={rainVideo}
        type="video/mp4"
      />
    </video>
  );
}