import prisma from "@/lib/prisma";

import type {
  ProgrammeHealth,
} from "@/types/dashboard";

import {
  analyseProgrammeHealth,
} from "@/lib/dashboard/programme-health-intelligence";


function getProjectScore(
  status: string,
): number {
  const scores: Record<string, number> = {
    COMPLETED: 100,
    ACTIVE: 75,
    PLANNED: 25,
    SUSPENDED: 0,
  };

  return scores[status] ?? 0;
}


function getActivityScore(
  status: string,
): number {
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


  const totalScore =
    indicators.reduce(
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


        /**
         * Indicator configured but reporting
         * has not started yet.
         */
        if (
          achieved === 0 &&
          target > 0
        ) {
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
    );


  return Math.round(
    totalScore / indicators.length,
  );
}


function calculateDataConfidence(
  indicators: {
    achieved: string | null;
  }[],
): number {

  if (indicators.length === 0) {
    return 0;
  }


  const reported =
    indicators.filter(
      (indicator) =>
        indicator.achieved !== null,
    ).length;


  return Math.round(
    (reported / indicators.length) * 100,
  );
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


  return programmes.map(
    (programme) => {

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
        calculateProgrammeIndicatorScore(
          programme.indicators,
        );


      const dataConfidence =
        calculateDataConfidence(
          programme.indicators,
        );


      /**
       * Future connections:
       * Governance Intelligence
       * Finance Intelligence
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

        dataConfidence,

        ...intelligence,

      };

    },
  );
}