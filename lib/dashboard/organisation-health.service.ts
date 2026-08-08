import prisma from "@/lib/prisma";

import { getProgrammeHealth } from "@/lib/dashboard/programme-health.service";

export interface OrganisationHealth {
  overallScore: number;

  status:
    | "Excellent"
    | "Healthy"
    | "Needs Attention"
    | "At Risk"
    | "Critical";

  healthScore: number;

  operationalReadiness: number;

  governanceReadiness: number;

  dataConfidence: number;

  programmeScore: number;

  projectScore: number;

  activityScore: number;

  indicatorScore: number;

  governanceScore: number;

  financeScore: number;

  strengths: string[];

  concerns: string[];

  recommendations: string[];
}

function classify(
  score: number,
): OrganisationHealth["status"] {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Healthy";
  if (score >= 50) return "Needs Attention";
  if (score >= 30) return "At Risk";
  return "Critical";
}

export async function getOrganisationHealth(): Promise<OrganisationHealth> {
  const [
    projects,
    activities,
    indicators,
    programmeHealth,
  ] = await Promise.all([
    prisma.project.findMany(),
    prisma.activity.findMany(),
    prisma.indicator.findMany(),
    getProgrammeHealth(),
  ]);

  const projectScores = projects.map((project) => {
    switch (project.status) {
      case "COMPLETED":
        return 100;
      case "ACTIVE":
        return 75;
      case "PLANNED":
        return 25;
      case "SUSPENDED":
        return 0;
      default:
        return 0;
    }
  });

  const projectScore =
    projectScores.length === 0
      ? 100
      : Math.round(
          projectScores.reduce(
            (total: number, score: number) => total + score,
            0,
          ) / projectScores.length,
        );

  const activityScore =
    activities.length === 0
      ? 100
      : Math.round(
          (
            activities.filter(
              (activity) =>
                activity.status === "COMPLETED",
            ).length /
            activities.length
          ) * 100,
        );

  const indicatorScore =
    indicators.length === 0
      ? 100
      : Math.round(
          indicators.reduce(
            (total, indicator) => {
              const target = Number(
                indicator.target ?? 0,
              );

              const achieved = Number(
                indicator.achieved ?? 0,
              );

              if (target <= 0) {
                return total + 50;
              }

              return (
                total +
                Math.min(
                  (achieved / target) * 100,
                  100,
                )
              );
            },
            0,
          ) / indicators.length,
        );

  const programmeScore =
    programmeHealth.length === 0
      ? 100
      : Math.round(
          programmeHealth.reduce(
            (total, programme) =>
              total + programme.overallScore,
            0,
          ) / programmeHealth.length,
        );

  const governanceScore = 60;
  const financeScore = 60;

  const operationalReadiness =
    Math.round(
      programmeScore * 0.50 +
      projectScore * 0.25 +
      activityScore * 0.25,
    );

  const governanceReadiness =
    governanceScore;

  const dataConfidence =
    indicators.length === 0
      ? 100
      : Math.round(
          (
            indicators.filter(
              (indicator) =>
                indicator.achieved !== null,
            ).length /
            indicators.length
          ) * 100,
        );

  const overallScore =
    Math.round(
      programmeScore * 0.40 +
      projectScore * 0.25 +
      activityScore * 0.20 +
      indicatorScore * 0.15,
    );

  const strengths: string[] = [];
  const concerns: string[] = [];
  const recommendations: string[] = [];

  if (programmeScore >= 70) {
    strengths.push(
      "Programme performance is generally healthy.",
    );
  } else if (programmeScore < 50) {
    concerns.push(
      "Overall programme performance is below the desired level.",
    );

    recommendations.push(
      "Review underperforming programmes and agree corrective actions.",
    );
  }

  if (projectScore >= 70) {
    strengths.push(
      "Project implementation is progressing well.",
    );
  } else if (projectScore < 50) {
    concerns.push(
      "Project implementation performance requires attention.",
    );

    recommendations.push(
      "Review project implementation schedules and delayed projects.",
    );
  }

  if (activityScore >= 70) {
    strengths.push(
      "Activity delivery is progressing well.",
    );
  } else if (activityScore < 50) {
    concerns.push(
      "Activity completion is below the desired level.",
    );

    recommendations.push(
      "Accelerate completion of outstanding implementation activities.",
    );
  }

  if (indicatorScore >= 70) {
    strengths.push(
      "Indicator achievement is generally positive.",
    );
  } else if (indicatorScore < 50) {
    concerns.push(
      "Indicator performance is below expectations.",
    );

    recommendations.push(
      "Improve results reporting and indicator achievement tracking.",
    );
  }

  if (dataConfidence < 70) {
    concerns.push(
      "Indicator data completeness requires attention.",
    );

    recommendations.push(
      "Update missing indicator achievement records and reporting data.",
    );
  }

  if (strengths.length === 0) {
    strengths.push(
      "No major operational strength has been identified from the current data.",
    );
  }

  return {
    overallScore,
    status: classify(overallScore),
    healthScore: overallScore,
    operationalReadiness,
    governanceReadiness,
    dataConfidence,
    programmeScore,
    projectScore,
    activityScore,
    indicatorScore,
    governanceScore,
    financeScore,
    strengths,
    concerns,
    recommendations,
  };
}
