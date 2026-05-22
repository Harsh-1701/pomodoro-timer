import { useEffect, useRef, useState } from "react";

import "./styles/app.css";

import TimerDisplay from "./components/TimerDisplay";
import Controls from "./components/Controls";
import Settings from "./components/Settings";
import SessionInfo from "./components/SessionInfo";

import BackgroundVideo from "./components/BackgroundVideo";
import AmbientSound from "./components/AmbientSound";

export default function App() {
  const DEFAULTS = {
    work: 25,
    shortBreak: 5,
    longBreak: 15,
  };

  const [workMinutes, setWorkMinutes] =
    useState(DEFAULTS.work);

  const [
    shortBreakMinutes,
    setShortBreakMinutes,
  ] = useState(DEFAULTS.shortBreak);

  const [
    longBreakMinutes,
    setLongBreakMinutes,
  ] = useState(DEFAULTS.longBreak);

  const [sessionType, setSessionType] =
    useState("Work");

  const [timeLeft, setTimeLeft] =
    useState(DEFAULTS.work * 60);

  const [isRunning, setIsRunning] =
    useState(false);

  const [
    completedWorkSessions,
    setCompletedWorkSessions,
  ] = useState(0);

  const [volume, setVolume] =
    useState(0.5);

  const [theme, setTheme] =
    useState("none");

  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

    const secs = (seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${mins}:${secs}`;
  };

  const switchSession = () => {
    if (sessionType === "Work") {
      const updatedCount =
        completedWorkSessions + 1;

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

    return () =>
      clearInterval(timerRef.current);
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
      {theme !== "none" && (
        <>
          <BackgroundVideo
            theme={theme}
          />

          <AmbientSound
            volume={volume}
            theme={theme}
            isRunning={isRunning}
          />

          <div className="background-overlay"></div>

        </>
      )}

      <div className="timer-card">
        <h1>Pomodoro Timer</h1>

        <SessionInfo
          sessionType={sessionType}
          completedWorkSessions={
            completedWorkSessions
          }
        />

        <TimerDisplay
          time={formatTime(timeLeft)}
        />

        <Controls
          isRunning={isRunning}
          startTimer={startTimer}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
        />

        <div className="theme-selector">
  <button
    className={
      theme === "none"
        ? "active-theme"
        : ""
    }
    onClick={() =>
      setTheme("none")
    }
  >
    🌙 Calm
  </button>

  <button
    className={
      theme === "rain"
        ? "active-theme"
        : ""
    }
    onClick={() =>
      setTheme("rain")
    }
  >
    🌧 Rain
  </button>

  <button
    className={
      theme === "fire"
        ? "active-theme"
        : ""
    }
    onClick={() =>
      setTheme("fire")
    }
  >
    🔥 Fire
  </button>

  <button
    className={
      theme === "ocean"
        ? "active-theme"
        : ""
    }
    onClick={() =>
      setTheme("ocean")
    }
  >
    🌊 Ocean
  </button>
</div>

        {theme !== "none" && (
          <div className="volume-control">
            <label>
              Ambient Volume
            </label>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) =>
                setVolume(
                  Number(
                    e.target.value
                  )
                )
              }
            />
          </div>
        )}

        <details className="settings-dropdown">
  <summary>
    ⚙ Timer Settings
  </summary>

  <Settings
    workMinutes={workMinutes}
    shortBreakMinutes={
      shortBreakMinutes
    }
    longBreakMinutes={
      longBreakMinutes
    }
    setWorkMinutes={
      setWorkMinutes
    }
    setShortBreakMinutes={
      setShortBreakMinutes
    }
    setLongBreakMinutes={
      setLongBreakMinutes
    }
  />
</details>
      </div>
    </div>
  );
}