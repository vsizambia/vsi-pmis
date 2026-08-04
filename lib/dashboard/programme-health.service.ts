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


    const completedProjects =
      projects.filter(
        (project) =>
          project.status === "COMPLETED",
      ).length;


    const projectScore =
      projects.length === 0
        ? 0
        : Math.round(
            (completedProjects /
              projects.length) *
              100,
          );


    const indicatorScore =
      programme.indicators.length === 0
        ? 0
        : Math.round(
            programme.indicators.reduce(
              (total, indicator) => {
                const target =
                  Number(indicator.target ?? 0);

                const achieved =
                  Number(indicator.achieved ?? 0);


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


    /*
      Temporary placeholders.

      These will later connect to:
      - Governance Intelligence
      - Finance Module
      - Compliance Register
    */
    const governanceScore = 100;

    const financeScore = 100;


    const overallScore =
      Math.round(
        projectScore * 0.30 +
        activityScore * 0.25 +
        indicatorScore * 0.25 +
        governanceScore * 0.10 +
        financeScore * 0.10,
      );


    return {
      id: programme.id,

      programmeId: programme.id,

      programmeName: programme.name,

      implementationScore: projectScore,

      financeScore,

      indicatorScore,

      governanceScore,

      overallScore,

      status: calculateStatus(
        overallScore,
      ),
    };
  });
}