
import { useState } from "react";
import axios from "axios";

import SecurityScoreCard from "../components/SecurityScoreCard";
import RiskBadge from "../components/RiskBadge";
import ScanSummary from "../components/ScanSummary";
import AIRecommendations from "../components/AIRecommendations";

import { generatePDF } from "../utils/PDFReport";

function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  const scanCode = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/scan",
        { code }
      );

      setResult(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        🛡 SecureCode AI
      </h1>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >
        <textarea
          rows="12"
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #334155",
            backgroundColor: "#1e293b",
            color: "white",
            fontSize: "14px"
          }}
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <br />
        <br />

        <button
          onClick={scanCode}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          Scan Code
        </button>

        {result && (
          <div style={{ marginTop: "30px" }}>
            <SecurityScoreCard score={result.score} />

            <RiskBadge score={result.score} />

            <ScanSummary issues={result.issues} />

            <button
              onClick={() => generatePDF(result)}
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                backgroundColor: "#16a34a",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              📄 Download Security Report
            </button>

            <h2
              style={{
                marginTop: "25px",
                marginBottom: "15px"
              }}
            >
              Issues Found
            </h2>

            {result.issues.length === 0 ? (
              <div
                style={{
                  backgroundColor: "#14532d",
                  padding: "15px",
                  borderRadius: "10px"
                }}
              >
                ✅ No vulnerabilities detected.
              </div>
            ) : (
              result.issues.map((issue, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderLeft: `5px solid ${
                      issue.severity === "Critical"
                        ? "#dc2626"
                        : issue.severity === "High"
                        ? "#ef4444"
                        : issue.severity === "Medium"
                        ? "#f59e0b"
                        : "#3b82f6"
                    }`,
                    borderRadius: "10px",
                    padding: "15px",
                    marginBottom: "15px"
                  }}
                >
                  <h3 style={{ margin: 0 }}>
                    {issue.type}
                  </h3>

                  <p
                    style={{
                      color:
                        issue.severity === "Critical"
                          ? "#dc2626"
                          : issue.severity === "High"
                          ? "#ef4444"
                          : issue.severity === "Medium"
                          ? "#f59e0b"
                          : "#3b82f6",
                      fontWeight: "bold"
                    }}
                  >
                    Severity: {issue.severity}
                  </p>

                  <p>{issue.message}</p>
                </div>
              ))
            )}

            <AIRecommendations issues={result.issues} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;