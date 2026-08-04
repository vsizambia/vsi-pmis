import prisma from "@/lib/prisma";

import type {
  ProgrammeHealth,
} from "@/types/dashboard";


function calculateStatus(
  score: number,
): ProgrammeHealth["status"] {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";

  return "Poor";
}


function getProjectScore(
  status: string,
): number {
  switch (status) {
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
}


function getActivityScore(
  status: string,
): number {
  switch (status) {
    case "COMPLETED":
      return 100;

    case "ACTIVE":
      return 70;

    case "PLANNED":
      return 30;

    case "SUSPENDED":
      return 0;

    default:
      return 0;
  }
}


export async function getProgrammeHealth(): Promise<
  ProgrammeHealth[]
> {
  const programmes =
    await prisma.programme.findMany({
      include: {
        projects: {
          include: {
            activities: true,
          },
        },

        indicators: true,
      },

      orderBy: {
        name: "asc",
      },
    });


  return programmes.map((programme) => {

    const projects =
      programme.projects;


    const activities =
      projects.flatMap(
        (project) =>
          project.activities,
      );


    const implementationScore =
      projects.length === 0
        ? 0
        : Math.round(
            projects.reduce(
              (total, project) =>
                total +
                getProjectScore(
                  project.status,
                ),
              0,
            ) /
              projects.length,
          );


    const activityScore =
      activities.length === 0
        ? 0
        : Math.round(
            activities.reduce(
              (total, activity) =>
                total +
                getActivityScore(
                  activity.status,
                ),
              0,
            ) /
              activities.length,
          );


    const indicatorScore =
      programme.indicators.length === 0
        ? 50
        : Math.round(
            programme.indicators.reduce(
              (total, indicator) => {

                const target =
                  Number(
                    indicator.target ?? 0,
                  );


                const achieved =
                  Number(
                    indicator.achieved ?? 0,
                  );


                if (target === 0) {
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
            ) /
              programme.indicators.length,
          );


    /**
     * Temporary neutral scores.
     * Connected to Governance Intelligence
     * and Finance Intelligence modules later.
     */
    const governanceScore = 50;

    const financeScore = 50;


    const overallScore =
      Math.round(
        implementationScore * 0.35 +
        activityScore * 0.25 +
        indicatorScore * 0.25 +
        governanceScore * 0.10 +
        financeScore * 0.05,
      );


    return {
      id: programme.id,

      programmeId: programme.id,

      programmeName: programme.name,


      implementationScore,

      activityScore,

      indicatorScore,

      governanceScore,

      financeScore,


      overallScore,


      healthDrivers: [
        {
          name: "Project Implementation",
          score: implementationScore,
        },

        {
          name: "Activity Completion",
          score: activityScore,
        },

        {
          name: "Indicator Performance",
          score: indicatorScore,
        },

        {
          name: "Governance Readiness",
          score: governanceScore,
        },

        {
          name: "Financial Readiness",
          score: financeScore,
        },
      ],


      status:
        calculateStatus(
          overallScore,
        ),
    };
  });
}