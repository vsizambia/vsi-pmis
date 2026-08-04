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


    /**
     * Project implementation score
     */
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


    /**
     * Activity completion score
     */
    const completedActivities =
      activities.filter(
        (activity) =>
          activity.status === "COMPLETED",
      ).length;


    const activityScore =
      activities.length === 0
        ? 0
        : Math.round(
            (completedActivities /
              activities.length) *
              100,
          );


    /**
     * Indicator achievement score
     */
    const indicatorScore =
      programme.indicators.length === 0
        ? 0
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
                  return total;
                }


                return (
                  total +
                  (achieved / target) * 100
                );
              },
              0,
            ) /
              programme.indicators.length,
          );


    /**
     * Future integrations:
     * Governance Intelligence
     * Finance Module
     */
    const governanceScore = 100;

    const financeScore = 100;


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

      financeScore,

      indicatorScore,

      governanceScore,

      overallScore,

      status:
        calculateStatus(
          overallScore,
        ),
    };
  });
}