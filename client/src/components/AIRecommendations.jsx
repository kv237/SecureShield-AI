export default function AIRecommendations({ issues }) {
  const getRecommendation = (type) => {
    switch (type) {
      case "Hardcoded Password":
        return {
          fix: "Store passwords in environment variables.",
          example:
            "const password = process.env.PASSWORD;"
        };

      case "Hardcoded API Key":
        return {
          fix: "Store API keys in .env files.",
          example:
            "const apiKey = process.env.API_KEY;"
        };

      case "Possible SQL Injection":
        return {
          fix: "Use parameterized queries.",
          example:
            'db.query("SELECT * FROM users WHERE id = ?", [userId]);'
        };

      case "Use of eval()":
        return {
          fix: "Avoid dynamic code execution.",
          example:
            "Use safer alternatives instead of eval()."
        };

      case "Command Injection Risk":
        return {
          fix: "Never pass user input to system commands.",
          example:
            "Validate input before using exec()."
        };

      case "Potential XSS":
        return {
          fix: "Sanitize user input before rendering.",
          example:
            "Use textContent instead of innerHTML."
        };

      case "Hardcoded Database Credentials":
        return {
          fix: "Move DB credentials to environment variables.",
          example:
            "DB_PASSWORD=secret"
        };

      case "Weak Cryptography":
        return {
          fix: "Use SHA-256, bcrypt, or Argon2.",
          example:
            "bcrypt.hash(password, 10)"
        };

      case "Path Traversal Risk":
        return {
          fix: "Validate and normalize file paths.",
          example:
            "path.normalize(userInput)"
        };

      default:
        return {
          fix: "Review the code manually.",
          example: ""
        };
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>🤖 AI Security Recommendations</h2>

      {issues.map((issue, index) => {
        const rec = getRecommendation(issue.type);

        return (
          <div
            key={index}
            style={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              color: "white"
            }}
          >
            <h3>{issue.type}</h3>

            <p>
              <strong>Recommendation:</strong>
              <br />
              {rec.fix}
            </p>

            <p>
              <strong>Example:</strong>
            </p>

            <pre
              style={{
                backgroundColor: "#0f172a",
                padding: "10px",
                borderRadius: "8px",
                overflowX: "auto"
              }}
            >
              {rec.example}
            </pre>
          </div>
        );
      })}
    </div>
  );
}