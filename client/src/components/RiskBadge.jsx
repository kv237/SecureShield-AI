export default function RiskBadge({ score }) {
  let risk = "LOW";
  let bgColor = "#16a34a";

  if (score <= 80) {
    risk = "MEDIUM";
    bgColor = "#f59e0b";
  }

  if (score <= 60) {
    risk = "HIGH";
    bgColor = "#ef4444";
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        display: "inline-block",
        fontWeight: "bold",
        marginTop: "15px"
      }}
    >
      {risk} RISK
    </div>
  );
}