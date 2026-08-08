import prisma from "@/lib/prisma";

import type { ProgrammeHealth } from "@/types/dashboard";

import {
  analyseProgrammeHealth,
} from "@/lib/dashboard/programme-health-intelligence";

function getProjectScore(status: string): number {
  const scores: Record<string, number> = {
    COMPLETED: 100,
    ACTIVE: 75,
    APPROVED: 60,
    PLANNED: 25,
    SUSPENDED: 0,
    CLOSED: 100,
    CANCELLED: 0,
  };

  return scores[status] ?? 0;
}

function getActivityScore(status: string): number {
  const scores: Record<string, number> = {
    COMPLETED: 100,
    ACTIVE: 70,
    PLANNED: 30,
    SUSPENDED: 0,
  };

  return scores[status] ?? 0;
}

function calculateProgrammeIndicatorScore(
  indicators: {
    target: string | null;
    achieved: string | null;
  }[],
): number {
  if (indicators.length === 0) {
    return 50;
  }

  const totalScore = indicators.reduce((total, indicator) => {
    const target = Number(indicator.target ?? 0);
    const achieved = Number(indicator.achieved ?? 0);

    if (target <= 0) {
      return total + 50;
    }

    if (achieved <= 0) {
      return total + 50;
    }

    return total + Math.min((achieved / target) * 100, 100);
  }, 0);

  return Math.round(totalScore / indicators.length);
}

function calculateDataConfidence(
  indicators: {
    achieved: string | null;
  }[],
): number {
  if (indicators.length === 0) {
    return 0;
  }

  const reported = indicators.filter(
    (indicator) => indicator.achieved !== null,
  ).length;

  return Math.round((reported / indicators.length) * 100);
}

function calculateGovernanceScore(
  projects: {
    status: string;
    riskLevel: string;
    risks: {
      status: string;
    }[];
  }[],
): number {
  if (projects.length === 0) {
    return 0;
  }

  const projectScores = projects.map((project) => {
    let score = 100;

    if (project.status === "SUSPENDED") {
      score -= 60;
    }

    if (project.status === "CANCELLED") {
      score -= 80;
    }

    if (
      project.riskLevel === "HIGH" ||
      project.riskLevel === "CRITICAL"
    ) {
      score -= 20;
    } else if (project.riskLevel === "MEDIUM") {
      score -= 10;
    }

    const openRisks = project.risks.filter(
      (risk) => risk.status !== "CLOSED",
    ).length;

    score -= Math.min(openRisks * 5, 20);

    return Math.max(score, 0);
  });

  return Math.round(
    projectScores.reduce((total, score) => total + score, 0) /
      projectScores.length,
  );
}

function calculateFinanceScore(
  projects: {
    budget: number | null;
    spent: number;
  }[],
): number {
  const totalBudget = projects.reduce(
    (total, project) => total + Number(project.budget ?? 0),
    0,
  );

  if (totalBudget <= 0) {
    return 50;
  }

  const totalSpent = projects.reduce(
    (total, project) => total + Number(project.spent ?? 0),
    0,
  );

  const utilisation = (totalSpent / totalBudget) * 100;

  if (utilisation > 100) {
    return 0;
  }

  if (utilisation === 0) {
    return 50;
  }

  /*
   * Financial readiness rewards reasonable budget execution.
   * Very low utilisation indicates under-execution, while
   * overspending is handled as a critical condition above.
   */
  if (utilisation < 25) {
    return 50;
  }

  if (utilisation < 50) {
    return 65;
  }

  if (utilisation <= 90) {
    return 100;
  }

  return 75;
}

export async function getProgrammeHealth(): Promise<
  ProgrammeHealth[]
> {
  const programmes = await prisma.programme.findMany({
    include: {
      projects: {
        include: {
          activities: true,
          risks: true,
        },
      },
      indicators: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return programmes.map((programme) => {
    const projects = programme.projects;

    const activities = projects.flatMap(
      (project) => project.activities,
    );

    const implementationScore =
      projects.length === 0
        ? 0
        : Math.round(
            projects.reduce(
              (total, project) =>
                total + getProjectScore(project.status),
              0,
            ) / projects.length,
          );

    const activityScore =
      activities.length === 0
        ? 0
        : Math.round(
            activities.reduce(
              (total, activity) =>
                total + getActivityScore(activity.status),
              0,
            ) / activities.length,
          );

    const indicatorScore =
      calculateProgrammeIndicatorScore(
        programme.indicators,
      );

    const dataConfidence =
      calculateDataConfidence(
        programme.indicators,
      );

    const governanceScore =
      calculateGovernanceScore(projects);

    const financeScore =
      calculateFinanceScore(projects);

    const intelligence =
      analyseProgrammeHealth({
        implementationScore,
        activityScore,
        indicatorScore,
        governanceScore,
        financeScore,
      });

    return {
      id: programme.id,
      programmeId: programme.id,
      programmeName: programme.name,
      implementationScore,
      activityScore,
      indicatorScore,
      governanceScore,
      financeScore,
      dataConfidence,
      ...intelligence,
    };
  });
}
