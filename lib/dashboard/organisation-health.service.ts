import prisma from "@/lib/prisma";

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
    programmes,
  ] = await Promise.all([
    prisma.project.findMany(),
    prisma.activity.findMany(),
    prisma.indicator.findMany(),
    prisma.programme.count(),
  ]);


  const projectScore =
    projects.length === 0
      ? 100
      : Math.round(
          (
            projects.filter(
              (project) =>
                project.status === "COMPLETED",
            ).length /
            projects.length
          ) * 100,
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
          ) / indicators.length,
        );


  const programmeScore =
    programmes === 0
      ? 100
      : Math.round(
          (
            projects.filter(
              (project) =>
                project.status !== "SUSPENDED",
            ).length /
            programmes
          ) * 100,
        );


  const governanceScore = 60;

  const financeScore = 60;


  const operationalReadiness =
    Math.round(
      (
        projectScore +
        activityScore +
        programmeScore
      ) / 3,
    );


  const governanceReadiness =
    governanceScore;


  const dataConfidence =
    Math.round(
      (
        indicatorScore +
        governanceScore +
        financeScore
      ) / 3,
    );


  const overallScore =
    Math.round(
      programmeScore * 0.20 +
      projectScore * 0.25 +
      activityScore * 0.20 +
      indicatorScore * 0.20 +
      governanceScore * 0.10 +
      financeScore * 0.05,
    );


  const strengths: string[] = [];

  const concerns: string[] = [];

  const recommendations: string[] = [];


  if (projectScore >= 70) {
    strengths.push(
      "Project implementation is progressing well.",
    );
  }


  if (activityScore >= 70) {
    strengths.push(
      "Activity execution is strong.",
    );
  }


  if (indicatorScore < 50) {
    concerns.push(
      "Programme indicators are underperforming.",
    );

    recommendations.push(
      "Improve indicator reporting and achievement tracking.",
    );
  }


  if (activityScore < 50) {
    concerns.push(
      "Large number of incomplete activities.",
    );

    recommendations.push(
      "Accelerate completion of outstanding activities.",
    );
  }


  if (projectScore < 50) {
    concerns.push(
      "Projects are progressing slowly.",
    );

    recommendations.push(
      "Review delayed projects with programme managers.",
    );
  }


  return {
    overallScore,

    status:
      classify(
        overallScore,
      ),


    healthScore:
      overallScore,

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