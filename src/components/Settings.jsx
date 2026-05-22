export default function Settings({
  workMinutes,
  shortBreakMinutes,
  longBreakMinutes,
  setWorkMinutes,
  setShortBreakMinutes,
  setLongBreakMinutes,
}) {
  return (
    <div className="settings">
      <label>Work Minutes</label>

      <input
        type="number"
        value={workMinutes}
        onChange={(e) =>
          setWorkMinutes(Number(e.target.value))
        }
      />

      <label>Short Break</label>

      <input
        type="number"
        value={shortBreakMinutes}
        onChange={(e) =>
          setShortBreakMinutes(Number(e.target.value))
        }
      />

      <label>Long Break</label>

      <input
        type="number"
        value={longBreakMinutes}
        onChange={(e) =>
          setLongBreakMinutes(Number(e.target.value))
        }
      />
    </div>
  );
}