import { useEffect, useRef, useState } from "react";
import "./styles/app.css";

export default function App() {
  const DEFAULTS = {
    work: 25,
    shortBreak: 5,
    longBreak: 15,
  };

  const [workMinutes, setWorkMinutes] = useState(DEFAULTS.work);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(DEFAULTS.shortBreak);
  const [longBreakMinutes, setLongBreakMinutes] = useState(DEFAULTS.longBreak);

  const [sessionType, setSessionType] = useState("Work");
  const [timeLeft, setTimeLeft] = useState(DEFAULTS.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedWorkSessions, setCompletedWorkSessions] = useState(0);

  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

    const secs = (seconds % 60).toString().padStart(2, "0");

    return `${mins}:${secs}`;
  };

  const switchSession = () => {
    if (sessionType === "Work") {
      const updatedCount = completedWorkSessions + 1;
      setCompletedWorkSessions(updatedCount);

      if (updatedCount % 4 === 0) {
        setSessionType("Long Break");
        setTimeLeft(longBreakMinutes * 60);
      } else {
        setSessionType("Short Break");
        setTimeLeft(shortBreakMinutes * 60);
      }
    } else {
      setSessionType("Work");
      setTimeLeft(workMinutes * 60);
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            switchSession();
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, sessionType]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    setSessionType("Work");
    setCompletedWorkSessions(0);
    setTimeLeft(workMinutes * 60);
  };

  return (
    <div className="app-container">
      <div className="timer-card">
        <h1>Pomodoro Timer</h1>

        <h2>{sessionType}</h2>

        <div className="timer-text">
          {formatTime(timeLeft)}
        </div>

        <p>Completed Sessions: {completedWorkSessions}</p>

        <div className="button-group">
          <button onClick={startTimer}>Start</button>

          <button onClick={stopTimer}>Stop</button>

          <button onClick={resetTimer}>Reset</button>
        </div>

        <div className="settings">
          <label>Work Minutes</label>
          <input
            type="number"
            value={workMinutes}
            onChange={(e) => setWorkMinutes(Number(e.target.value))}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <label>Short Break</label>
          <input
            type="number"
            value={shortBreakMinutes}
            onChange={(e) => setShortBreakMinutes(Number(e.target.value))}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <label>Long Break</label>
          <input
            type="number"
            value={longBreakMinutes}
            onChange={(e) => setLongBreakMinutes(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}