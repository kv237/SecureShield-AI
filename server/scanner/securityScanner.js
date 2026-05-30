function scanCode(code) {
  const issues = [];

  // Hardcoded Password
  if (/password\s*=\s*["'].*["']/i.test(code)) {
    issues.push({
      type: "Hardcoded Password",
      severity: "High",
      message: "Avoid storing passwords directly in code."
    });
  }

  // Hardcoded API Key
  if (
    /apikey\s*=\s*["'].*["']/i.test(code) ||
    /api[_-]?key\s*[:=]\s*["'].*["']/i.test(code)
  ) {
    issues.push({
      type: "Hardcoded API Key",
      severity: "High",
      message: "Store API keys in environment variables."
    });
  }

  // Hardcoded Secret Key
  if (/secretkey\s*=\s*["'].*["']/i.test(code)) {
    issues.push({
      type: "Hardcoded Secret Key",
      severity: "High",
      message: "Secrets should not be stored in source code."
    });
  }

  // SQL Injection
  if (
    code.includes("SELECT") &&
    code.includes("+")
  ) {
    issues.push({
      type: "Possible SQL Injection",
      severity: "Critical",
      message: "Use parameterized queries."
    });
  }

  // eval()
  if (code.includes("eval(")) {
    issues.push({
      type: "Use of eval()",
      severity: "High",
      message: "Avoid executing dynamic code."
    });
  }

  // Command Injection
  if (
    code.includes("exec(") ||
    code.includes("execSync(") ||
    code.includes("spawn(")
  ) {
    issues.push({
      type: "Command Injection Risk",
      severity: "Critical",
      message:
        "User input may be executed as a system command."
    });
  }

  // XSS Detection
  if (
    code.includes("innerHTML") ||
    code.includes("req.query.q") ||
    code.includes("res.send(")
  ) {
    issues.push({
      type: "Cross-Site Scripting (XSS)",
      severity: "High",
      message:
        "Untrusted user input may be rendered in HTML."
    });
  }

  // Path Traversal
  if (
    code.includes("sendFile(") ||
    code.includes("../") ||
    code.includes("..\\")
  ) {
    issues.push({
      type: "Path Traversal Risk",
      severity: "High",
      message:
        "User-controlled file paths detected."
    });
  }

  // Weak Random Generator
  if (
    code.includes("Math.random(")
  ) {
    issues.push({
      type: "Weak Random Generator",
      severity: "Medium",
      message:
        "Math.random() is not suitable for security-sensitive operations."
    });
  }

  // Sensitive Data Exposure
  if (
    code.includes("Credit Card") ||
    code.includes("console.log(")
  ) {
    issues.push({
      type: "Sensitive Data Exposure",
      severity: "High",
      message:
        "Sensitive information may be exposed through logs."
    });
  }

  // Insecure Cookie
  if (
    code.includes("res.cookie(")
  ) {
    issues.push({
      type: "Insecure Cookie Configuration",
      severity: "Medium",
      message:
        "Cookies should use Secure and HttpOnly flags."
    });
  }

  // Open Redirect
  if (
    code.includes("res.redirect(")
  ) {
    issues.push({
      type: "Open Redirect",
      severity: "Medium",
      message:
        "Validate redirect URLs before use."
    });
  }

  // Hardcoded Database Credentials
  if (
    /db_password\s*=\s*["'].*["']/i.test(code) ||
    /database_password\s*=\s*["'].*["']/i.test(code) ||
    /mysql:\/\/.*:.*@/i.test(code)
  ) {
    issues.push({
      type: "Hardcoded Database Credentials",
      severity: "Critical",
      message:
        "Database credentials should not be stored in source code."
    });
  }

  // Weak Cryptography
  if (
    code.includes("md5(") ||
    code.includes("sha1(")
  ) {
    issues.push({
      type: "Weak Cryptography",
      severity: "Medium",
      message:
        "MD5 and SHA1 are considered insecure."
    });
  }

  // Missing Rate Limiting
  if (
    code.includes("/otp") &&
    !code.includes("rateLimit")
  ) {
    issues.push({
      type: "Missing Rate Limiting",
      severity: "Medium",
      message:
        "Authentication or OTP endpoints should implement rate limiting."
    });
  }

  // Weak Authentication
  if (
    code.includes("username ===") &&
    code.includes("password ===")
  ) {
    issues.push({
      type: "Weak Authentication",
      severity: "High",
      message:
        "Hardcoded authentication logic detected."
    });
  }

  return issues;
}

module.exports = scanCode;