import prisma from "@/lib/prisma";

import type {
  ProgrammeHealth,
} from "@/types/dashboard";

import {
  getIndicatorHealth,
} from "@/lib/dashboard/indicator-health.service";

import {
  analyseProgrammeHealth,
} from "@/lib/dashboard/programme-health-intelligence";


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

  const [
    indicatorHealth,
    programmes,
  ] = await Promise.all([
    getIndicatorHealth(),

    prisma.programme.findMany({
      include: {
        projects: {
          include: {
            activities: true,
          },
        },
      },

      orderBy: {
        name: "asc",
      },
    }),
  ]);


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
            ) / projects.length,
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
            ) / activities.length,
          );


    const indicatorScore =
      indicatorHealth.achievementScore;


    /**
     * Temporary intelligence placeholders.
     * These will connect to Governance
     * and Finance modules later.
     */
    const governanceScore = 50;

    const financeScore = 50;


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

      ...intelligence,
    };
  });
}