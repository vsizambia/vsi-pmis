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
    projects,
    projectRisks,
    projectIssues,
  ] = await Promise.all([
    prisma.project.findMany({
      select: {
        status: true,
        riskLevel: true,
      },
    }),

    prisma.projectRisk.findMany({
      select: {
        status: true,
        probability: true,
        impact: true,
      },
    }),

    prisma.projectIssue.findMany({
      select: {
        status: true,
        priority: true,
      },
    }),
  ]);

  const totalProjects = projects.length;

  const suspendedProjects = projects.filter(
    (project) => project.status === "SUSPENDED",
  ).length;

  const cancelledProjects = projects.filter(
    (project) => project.status === "CANCELLED",
  ).length;

  const complianceRate =
    totalProjects === 0
      ? 100
      : Math.round(
          ((totalProjects -
            suspendedProjects -
            cancelledProjects) /
            totalProjects) *
            100,
        );

  const highRisks =
    projects.filter(
      (project) =>
        project.riskLevel === "HIGH" ||
        project.riskLevel === "CRITICAL",
    ).length;

  const mediumRisks =
    projects.filter(
      (project) => project.riskLevel === "MEDIUM",
    ).length;

  const lowRisks =
    projects.filter(
      (project) => project.riskLevel === "LOW",
    ).length;

  const openRisks = projectRisks.filter(
    (risk) => risk.status !== "CLOSED",
  );

  const openIssues = projectIssues.filter(
    (issue) => issue.status !== "CLOSED",
  );

  const criticalRiskItems = openRisks.filter(
    (risk) =>
      risk.impact === "CRITICAL" ||
      risk.probability === "HIGH" &&
        risk.impact === "HIGH",
  ).length;

  const highPriorityIssues = openIssues.filter(
    (issue) =>
      issue.priority === "HIGH" ||
      issue.priority === "CRITICAL",
  ).length;

  /*
   * Governance score reflects:
   * - project compliance
   * - portfolio risk exposure
   * - unresolved risks/issues
   *
   * It does not treat incomplete activities as governance failures.
   */
  let governanceScore = complianceRate;

  governanceScore -= Math.min(highRisks * 5, 20);
  governanceScore -= Math.min(criticalRiskItems * 5, 15);
  governanceScore -= Math.min(highPriorityIssues * 3, 10);

  governanceScore = Math.max(
    0,
    Math.min(100, governanceScore),
  );

  const activeAlerts =
    openRisks.length +
    openIssues.length;

  return {
    governanceScore: Math.round(governanceScore),

    complianceRate,

    highRisks,

    mediumRisks,

    lowRisks,

    pendingAudits: 0,

    policiesDue: 0,

    activeAlerts,
  };
}
