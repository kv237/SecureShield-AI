import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = (result) => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const addFooter = (pageNum) => {
    doc.setFontSize(9);
    doc.setTextColor(120);

    doc.line(10, pageHeight - 15, pageWidth - 10, pageHeight - 15);

    doc.text(
      "SecureShield AI - Automated Security Assessment Report",
      14,
      pageHeight - 8
    );

    doc.text(
      `Page ${pageNum}`,
      pageWidth - 25,
      pageHeight - 8
    );
  };

  // =====================================================
  // COVER PAGE
  // =====================================================

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  doc.setTextColor(255, 255, 255);

  doc.setFontSize(30);
  doc.text("SecureShield AI", 105, 60, {
    align: "center",
  });

  doc.setFontSize(18);
  doc.text("Security Assessment Report", 105, 80, {
    align: "center",
  });

  doc.setFontSize(12);

  doc.text(
    "AI-Powered Vulnerability Analysis & Risk Assessment",
    105,
    95,
    { align: "center" }
  );

  doc.setFontSize(11);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    105,
    120,
    { align: "center" }
  );

  doc.text(
    "Prepared by SecureShield AI Engine",
    105,
    130,
    { align: "center" }
  );

  doc.setFontSize(10);

  doc.text(
    "Confidential Security Report",
    105,
    250,
    { align: "center" }
  );

  addFooter(1);

  // =====================================================
  // DASHBOARD PAGE
  // =====================================================

  doc.addPage();

  doc.setTextColor(0, 0, 0);

  doc.setFontSize(22);
  doc.text("Security Dashboard", 14, 20);

  const findings = result.issues || [];
  let score = 100;

findings.forEach((issue) => {
  if (issue.severity === "Critical") {
    score -= 15;
  } else if (issue.severity === "High") {
    score -= 8;
  } else if (issue.severity === "Medium") {
    score -= 4;
  } else {
    score -= 2;
  }
});

score = Math.max(score, 10);

  const critical = findings.filter(
    (i) => i.severity === "Critical"
  ).length;

  const high = findings.filter(
    (i) => i.severity === "High"
  ).length;

  const medium = findings.filter(
    (i) => i.severity === "Medium"
  ).length;

  const low = findings.filter(
    (i) => i.severity === "Low"
  ).length;

  // Score Box
  doc.setFillColor(230, 240, 255);
  doc.roundedRect(14, 30, 70, 30, 3, 3, "F");

  doc.setFontSize(14);
  doc.text("Security Score", 20, 42);

  doc.setFontSize(22);
  doc.text(`${score}/100`, 20, 55);

  doc.setFontSize(12);

const riskBadge =
  score < 30
    ? "CRITICAL RISK"
    : score < 50
    ? "HIGH RISK"
    : score < 70
    ? "MEDIUM RISK"
    : "LOW RISK";

if (score < 30) {
  doc.setTextColor(220, 38, 38);
} else if (score < 50) {
  doc.setTextColor(234, 88, 12);
} else if (score < 70) {
  doc.setTextColor(202, 138, 4);
} else {
  doc.setTextColor(22, 163, 74);
}

doc.setFontSize(12);
doc.text(riskBadge, 20, 65);
doc.setTextColor(0, 0, 0);


  // Total Issues
  doc.setFillColor(255, 245, 230);
  doc.roundedRect(100, 30, 90, 30, 3, 3, "F");

  doc.setFontSize(14);
  doc.text("Total Findings", 110, 42);

  doc.setFontSize(22);
  doc.text(`${findings.length}`, 110, 55);

  autoTable(doc, {
    startY: 80,
    head: [["Severity", "Count"]],
    body: [
      ["Critical", critical],
      ["High", high],
      ["Medium", medium],
      ["Low", low],
    ],
    theme: "grid",
    headStyles: {
      fillColor: [15, 23, 42],
    },
  });

  addFooter(2);

  // =====================================================
  // FINDINGS TABLE
  // =====================================================

  doc.addPage();

  doc.setFontSize(20);
  doc.text("Security Findings", 14, 20);

  const findingsTable = findings.map((issue, index) => [
    index + 1,
    issue.type || "Unknown",
    issue.severity || "Medium",
    issue.description || "",
  ]);

  autoTable(doc, {
    startY: 30,
    head: [
      [
        "#",
        "Issue",
        "Severity",
        "Description",
      ],
    ],
    body: findingsTable,
    theme: "striped",
    headStyles: {
      fillColor: [15, 23, 42],
    },
  });

  addFooter(3);

  // =====================================================
  // CWE + CVSS + OWASP
  // =====================================================

  doc.addPage();

  doc.setFontSize(20);
  doc.text(
    "CWE / CVSS / OWASP Mapping",
    14,
    20
  );

const mappings = {

  "Hardcoded Password": {
    cwe: "CWE-798",
    cvss: "8.4",
    owasp: "A07 Authentication Failures"
  },

  "Hardcoded API Key": {
    cwe: "CWE-798",
    cvss: "8.2",
    owasp: "A02 Cryptographic Failures"
  },

  "Hardcoded Secret Key": {
    cwe: "CWE-798",
    cvss: "8.2",
    owasp: "A02 Cryptographic Failures"
  },

  "Possible SQL Injection": {
    cwe: "CWE-89",
    cvss: "9.8",
    owasp: "A03 Injection"
  },

  "Use of eval()": {
    cwe: "CWE-95",
    cvss: "9.1",
    owasp: "A03 Injection"
  },

  "Command Injection Risk": {
    cwe: "CWE-78",
    cvss: "9.8",
    owasp: "A03 Injection"
  },

  "Cross-Site Scripting (XSS)": {
    cwe: "CWE-79",
    cvss: "8.8",
    owasp: "A03 Injection"
  },

  "Path Traversal Risk": {
    cwe: "CWE-22",
    cvss: "8.6",
    owasp: "A01 Broken Access Control"
  },

  "Weak Random Generator": {
    cwe: "CWE-338",
    cvss: "5.3",
    owasp: "A02 Cryptographic Failures"
  },

  "Sensitive Data Exposure": {
    cwe: "CWE-200",
    cvss: "7.5",
    owasp: "A02 Cryptographic Failures"
  },

  "Insecure Cookie Configuration": {
    cwe: "CWE-614",
    cvss: "6.1",
    owasp: "A05 Security Misconfiguration"
  },

  "Open Redirect": {
    cwe: "CWE-601",
    cvss: "6.1",
    owasp: "A10 SSRF"
  },

  "Missing Rate Limiting": {
    cwe: "CWE-307",
    cvss: "5.9",
    owasp: "A07 Authentication Failures"
  },

  "Weak Authentication": {
    cwe: "CWE-287",
    cvss: "8.1",
    owasp: "A07 Authentication Failures"
  }

};

const mappingData = findings.map((issue) => {

  const map =
    mappings[issue.type] || {
      cwe: "N/A",
      cvss: "N/A",
      owasp: "N/A"
    };

  return [
    issue.type,
    map.cwe,
    map.cvss,
    map.owasp
  ];
});

  autoTable(doc, {
    startY: 30,
    head: [
      [
        "Finding",
        "CWE",
        "CVSS",
        "OWASP",
      ],
    ],
    body: mappingData,
    theme: "grid",
    headStyles: {
      fillColor: [15, 23, 42],
    },
  });

  addFooter(4);

  // =====================================================
  // AI RISK ASSESSMENT
  // =====================================================

  doc.addPage();

  doc.setFontSize(20);
  doc.text("AI Risk Assessment", 14, 20);

let riskLevel = "LOW";

if (score < 30) {
  riskLevel = "CRITICAL";
} else if (score < 50) {
  riskLevel = "HIGH";
} else if (score < 70) {
  riskLevel = "MEDIUM";
}

doc.setFontSize(16);
doc.text(
  `Overall Risk Level: ${riskLevel}`,
  14,
  40
);

doc.setFontSize(12);

doc.text(
  `Security Score: ${score}/100`,
  14,
  55
);

doc.text(
  `Total Findings: ${findings.length}`,
  14,
  65
);

doc.text(
  `Critical: ${critical}`,
  14,
  75
);

doc.text(
  `High: ${high}`,
  14,
  85
);

doc.text(
  `Medium: ${medium}`,
  14,
  95
);

doc.text(
  `Low: ${low}`,
  14,
  105
);

doc.setFontSize(11);

doc.text(
  "Summary:",
  14,
  125
);

doc.text(
  "The AI engine identified vulnerabilities that could",
  14,
  140
);

doc.text(
  "lead to unauthorized access, code execution,",
  14,
  150
);

doc.text(
  "data leakage, authentication bypass, and",
  14,
  160
);

doc.text(
  "other application security risks.",
  14,
  170
);

doc.text(
  "Immediate remediation is recommended for",
  14,
  185
);

doc.text(
  "all Critical and High severity findings.",
  14,
  195
);

  // =====================================================
  // RECOMMENDATIONS
  // =====================================================

  doc.addPage();

  doc.setFontSize(20);
  doc.text(
    "Recommendations",
    14,
    20
  );

  const getRecommendation = (type) => {

  const recommendations = {

    "Hardcoded Password":
      "Store passwords in environment variables.",

    "Hardcoded API Key":
      "Move API keys into .env files.",

    "Hardcoded Secret Key":
      "Store secret keys in secure vaults or environment variables.",

    "Possible SQL Injection":
      "Use parameterized queries or prepared statements.",

    "Use of eval()":
      "Replace eval() with safer alternatives.",

    "Command Injection Risk":
      "Never pass user input directly into system commands.",

    "Cross-Site Scripting (XSS)":
      "Sanitize and encode user-controlled output.",

    "Path Traversal Risk":
      "Normalize and validate file paths.",

    "Weak Random Generator":
      "Use crypto.randomInt() for security-sensitive operations.",

    "Sensitive Data Exposure":
      "Remove sensitive information from logs.",

    "Insecure Cookie Configuration":
      "Enable Secure, HttpOnly and SameSite cookie flags.",

    "Open Redirect":
      "Validate redirect destinations using a whitelist.",

    "Missing Rate Limiting":
      "Apply rate limiting to login and OTP endpoints.",

    "Weak Authentication":
      "Use hashed passwords and multi-factor authentication."
  };

  return (
    recommendations[type] ||
    "Follow secure coding best practices."
  );
};

const recommendations = findings.map((issue) => [
  issue.type,
  getRecommendation(issue.type)
]);
  autoTable(doc, {
    startY: 30,
    head: [
      [
        "Finding",
        "Recommendation",
      ],
    ],
    body: recommendations,
    theme: "striped",
    headStyles: {
      fillColor: [15, 23, 42],
    },
  });

  doc.setFontSize(12);

  doc.text(
    "Security Best Practices:",
    14,
    doc.lastAutoTable.finalY + 20
  );

  doc.text(
    "• Use parameterized queries",
    20,
    doc.lastAutoTable.finalY + 35
  );

  doc.text(
    "• Enforce strong authentication",
    20,
    doc.lastAutoTable.finalY + 45
  );

  doc.text(
    "• Implement input validation",
    20,
    doc.lastAutoTable.finalY + 55
  );

  doc.text(
    "• Perform regular security audits",
    20,
    doc.lastAutoTable.finalY + 65
  );

  addFooter(6);

  // =====================================================
  // SAVE
  // =====================================================

  doc.save(
    `SecureShield_Report_${Date.now()}.pdf`
  );
};