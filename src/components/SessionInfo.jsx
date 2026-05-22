export default function SessionInfo({
  sessionType,
  completedWorkSessions,
}) {
  return (
    <>
      <h2
  style={{
    fontSize: "32px",
    marginBottom: "10px",
  }}
>
  {sessionType}
</h2>

      <p>
        Completed Sessions:
        {" "}
        {completedWorkSessions}
      </p>
    </>
  );
}

<p style={{ opacity: 0.8 }}>
  Stay focused. One session at a time.
</p>