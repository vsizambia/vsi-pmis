import type { ProgrammeHealth } from "@/types/dashboard";

export interface ProgrammeHealthInput {
  implementationScore: number;
  activityScore: number;
  indicatorScore: number;
  governanceScore: number;
  financeScore: number;
}

export interface ProgrammeHealthAnalysis {
  overallScore: number;
  status: ProgrammeHealth["status"];
  healthDrivers: ProgrammeHealth["healthDrivers"];
  strengths: string[];
  concerns: string[];
  recommendations: string[];
}

const WEIGHTS = {
  implementation: 0.35,
  activity: 0.25,
  indicators: 0.25,
  governance: 0.10,
  finance: 0.05,
} as const;

function calculateStatus(score: number): ProgrammeHealth["status"] {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  return "Poor";
}

export function analyseProgrammeHealth(
  input: ProgrammeHealthInput,
): ProgrammeHealthAnalysis {
  const overallScore = Math.round(
    input.implementationScore * WEIGHTS.implementation +
      input.activityScore * WEIGHTS.activity +
      input.indicatorScore * WEIGHTS.indicators +
      input.governanceScore * WEIGHTS.governance +
      input.financeScore * WEIGHTS.finance,
  );

  const strengths: string[] = [];
  const concerns: string[] = [];
  const recommendations: string[] = [];

  if (input.implementationScore >= 80) {
    strengths.push("Projects are progressing well.");
  } else if (input.implementationScore < 50) {
    concerns.push("Project implementation is behind schedule.");
    recommendations.push(
      "Review project timelines and accelerate implementation.",
    );
  }

  if (input.activityScore >= 80) {
    strengths.push("Activity delivery is on track.");
  } else if (input.activityScore < 50) {
    concerns.push("Activity completion is below target.");
    recommendations.push(
      "Increase completion of planned activities.",
    );
  }

  if (input.indicatorScore >= 70) {
    strengths.push("Programme results are being achieved.");
  } else {
    concerns.push("Indicator performance is below expectations.");
    recommendations.push(
      "Update indicator achievements and improve reporting.",
    );
  }

  if (input.governanceScore < 60) {
    concerns.push("Governance readiness requires improvement.");
    recommendations.push(
      "Complete outstanding governance and compliance actions.",
    );
  }

  if (input.financeScore < 60) {
    concerns.push("Financial performance requires attention.");
    recommendations.push(
      "Review programme budget execution.",
    );
  }

  return {
    overallScore,
    status: calculateStatus(overallScore),
    strengths,
    concerns,
    recommendations,
    healthDrivers: [
      {
        name: "Project Implementation",
        score: input.implementationScore,
        weight: 35,
      },
      {
        name: "Activity Completion",
        score: input.activityScore,
        weight: 25,
      },
      {
        name: "Indicator Performance",
        score: input.indicatorScore,
        weight: 25,
      },
      {
        name: "Governance Readiness",
        score: input.governanceScore,
        weight: 10,
      },
      {
        name: "Financial Readiness",
        score: input.financeScore,
        weight: 5,
      },
    ],
  };
}