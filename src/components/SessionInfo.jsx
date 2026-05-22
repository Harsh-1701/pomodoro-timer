export default function SessionInfo({
  sessionType,
  completedWorkSessions,
}) {
  return (
    <div className="session-info">
      <h2>{sessionType}</h2>

      <p>
        Sessions Completed:
        {" "}
        {completedWorkSessions}
      </p>
    </div>
  );
}