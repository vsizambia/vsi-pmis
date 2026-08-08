import prisma from "@/lib/prisma";

export type RiskLevel =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export interface RiskItem {
  id: string;
  name: string;
  score: number;
  level: RiskLevel;
  recommendation: string;
}

export interface RiskIntelligence {
  overallRiskScore: number;
  portfolioRisk: RiskLevel;

  highRiskProjects: number;
  mediumRiskProjects: number;
  lowRiskProjects: number;

  risks: RiskItem[];
}

function normaliseRiskLevel(value: string | null | undefined): RiskLevel {
  switch ((value ?? "").toUpperCase()) {
    case "CRITICAL":
      return "Critical";
    case "HIGH":
      return "High";
    case "MEDIUM":
      return "Medium";
    default:
      return "Low";
  }
}

function probabilityScore(value: string | null | undefined): number {
  switch ((value ?? "").toUpperCase()) {
    case "CRITICAL":
      return 100;
    case "HIGH":
      return 75;
    case "MEDIUM":
      return 50;
    case "LOW":
      return 25;
    default:
      return 0;
  }
}

function impactScore(value: string | null | undefined): number {
  switch ((value ?? "").toUpperCase()) {
    case "CRITICAL":
      return 100;
    case "HIGH":
      return 75;
    case "MEDIUM":
      return 50;
    case "LOW":
      return 25;
    default:
      return 0;
  }
}

function classifyRisk(score: number): RiskLevel {
  if (score >= 75) return "Critical";
  if (score >= 50) return "High";
  if (score >= 25) return "Medium";
  return "Low";
}

function recommendation(level: RiskLevel): string {
  switch (level) {
    case "Critical":
      return "Executive intervention required.";

    case "High":
      return "Immediate management review required.";

    case "Medium":
      return "Increase implementation oversight.";

    default:
      return "Continue monitoring.";
  }
}

export async function getRiskIntelligence(): Promise<RiskIntelligence> {
  const projects = await prisma.project.findMany({
    include: {
      risks: true,
      issues: true,
    },
  });

  const risks: RiskItem[] = [];

  let totalRisk = 0;

  let highRiskProjects = 0;
  let mediumRiskProjects = 0;
  let lowRiskProjects = 0;

  for (const project of projects) {
    const projectRiskScore =
      normaliseRiskLevel(project.riskLevel) === "Critical"
        ? 100
        : normaliseRiskLevel(project.riskLevel) === "High"
          ? 75
          : normaliseRiskLevel(project.riskLevel) === "Medium"
            ? 50
            : 25;

    const openRisks = project.risks.filter(
      (risk) => risk.status.toUpperCase() !== "CLOSED",
    );

    const recordedRiskScores = openRisks.map((risk) => {
      const probability = probabilityScore(risk.probability);
      const impact = impactScore(risk.impact);

      return Math.round((probability + impact) / 2);
    });

    const recordedRiskScore =
      recordedRiskScores.length > 0
        ? Math.max(...recordedRiskScores)
        : 0;

    const openHighPriorityIssues = project.issues.filter(
      (issue) =>
        issue.status.toUpperCase() !== "CLOSED" &&
        ["HIGH", "CRITICAL"].includes(
          issue.priority.toUpperCase(),
        ),
    ).length;

    const issuePenalty = Math.min(
      openHighPriorityIssues * 10,
      20,
    );

    const score = Math.min(
      Math.max(
        projectRiskScore,
        recordedRiskScore,
      ) + issuePenalty,
      100,
    );

    const level = classifyRisk(score);

    if (level === "Critical" || level === "High") {
      highRiskProjects++;
    } else if (level === "Medium") {
      mediumRiskProjects++;
    } else {
      lowRiskProjects++;
    }

    totalRisk += score;

    risks.push({
      id: project.id,
      name: project.name,
      score,
      level,
      recommendation: recommendation(level),
    });
  }

  const overallRiskScore =
    projects.length === 0
      ? 0
      : Math.round(totalRisk / projects.length);

  return {
    overallRiskScore,
    portfolioRisk: classifyRisk(overallRiskScore),
    highRiskProjects,
    mediumRiskProjects,
    lowRiskProjects,
    risks,
  };
}
