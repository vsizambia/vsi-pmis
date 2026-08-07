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

function classifyRisk(score: number): RiskLevel {
  if (score >= 75) return "Critical";
  if (score >= 50) return "High";
  if (score >= 25) return "Medium";
  return "Low";
}

export async function getRiskIntelligence(): Promise<RiskIntelligence> {
  const projects = await prisma.project.findMany({
    include: {
      activities: true,
    },
  });

  const risks: RiskItem[] = [];

  let totalRisk = 0;

  let highRiskProjects = 0;
  let mediumRiskProjects = 0;
  let lowRiskProjects = 0;

  for (const project of projects) {
    let score = 0;

    if (project.status === "SUSPENDED") {
      score += 80;
    } else if (project.status === "PLANNED") {
      score += 40;
    } else if (project.status === "ACTIVE") {
      score += 20;
    }

    const incompleteActivities =
      project.activities.filter(
        (activity) => activity.status !== "COMPLETED",
      ).length;

    score += Math.min(incompleteActivities * 5, 20);

    score = Math.min(score, 100);

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
      recommendation:
        level === "Low"
          ? "Continue monitoring."
          : level === "Medium"
          ? "Increase implementation oversight."
          : level === "High"
          ? "Immediate management review required."
          : "Executive intervention required.",
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