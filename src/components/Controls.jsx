export default function Controls({
  isRunning,
  startTimer,
  stopTimer,
  resetTimer,
}) {
  return (
    <div className="button-group">
      {!isRunning ? (
        <button onClick={startTimer}>
          Start
        </button>
      ) : (
        <button onClick={stopTimer}>
          Stop
        </button>
      )}

      <button onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
}