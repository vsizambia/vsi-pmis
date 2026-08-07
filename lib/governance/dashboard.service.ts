import prisma from "@/lib/prisma";

export interface GovernanceDashboard {
  governanceScore: number;

  complianceRate: number;

  highRisks: number;

  mediumRisks: number;

  lowRisks: number;

  pendingAudits: number;

  policiesDue: number;

  activeAlerts: number;
}

export async function getGovernanceDashboard(): Promise<GovernanceDashboard> {

  const [
    suspendedProjects,
    totalProjects,
    incompleteActivities,
    indicators,
  ] = await Promise.all([
    prisma.project.count({
      where: {
        status: "SUSPENDED",
      },
    }),

    prisma.project.count(),

    prisma.activity.count({
      where: {
        status: {
          not: "COMPLETED",
        },
      },
    }),

    prisma.indicator.findMany(),
  ]);

  const complianceRate =
    totalProjects === 0
      ? 100
      : Math.round(
          ((totalProjects - suspendedProjects) /
            totalProjects) *
            100,
        );

  const governanceScore = Math.round(
    complianceRate * 0.6 +
      (100 - incompleteActivities) * 0.2 +
      60 * 0.2,
  );

  const highRisks = suspendedProjects;

  const mediumRisks =
    incompleteActivities;

  const lowRisks =
    Math.max(
      indicators.length -
        highRisks -
        mediumRisks,
      0,
    );

  return {
    governanceScore,

    complianceRate,

    highRisks,

    mediumRisks,

    lowRisks,

    pendingAudits: 0,

    policiesDue: 0,

    activeAlerts:
      highRisks + mediumRisks,
  };
}