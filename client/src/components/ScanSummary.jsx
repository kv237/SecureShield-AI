export default function ScanSummary({ issues }) {
  const critical = issues.filter(
    (i) => i.severity === "Critical"
  ).length;

  const high = issues.filter(
    (i) => i.severity === "High"
  ).length;

  const medium = issues.filter(
    (i) => i.severity === "Medium"
  ).length;

  const low = issues.filter(
    (i) => i.severity === "Low"
  ).length;

  const cardStyle = {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    minWidth: "150px",
    border: "1px solid #334155",
    color: "white"
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        marginTop: "20px",
        marginBottom: "25px"
      }}
    >
      <div style={cardStyle}>
        <h2>{issues.length}</h2>
        <p>Total Issues</p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ color: "#dc2626" }}>
          {critical}
        </h2>
        <p>Critical</p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ color: "#ef4444" }}>
          {high}
        </h2>
        <p>High</p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ color: "#f59e0b" }}>
          {medium}
        </h2>
        <p>Medium</p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ color: "#3b82f6" }}>
          {low}
        </h2>
        <p>Low</p>
      </div>
    </div>
  );
}