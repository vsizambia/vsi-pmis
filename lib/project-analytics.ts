import type { Project, Programme } from "@prisma/client";

type AnalyticsProject = Project & {
  programme: Programme;
  indicators: {
    id: string;
  }[];
  updates: {
    id: string;
  }[];
  risks: {
    status: string;
    impact: string;
  }[];
};

export function calculateProjectAnalytics(
  projects: AnalyticsProject[]
) {
  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) => project.status === "ACTIVE"
  ).length;

  const plannedProjects = projects.filter(
    (project) => project.status === "PLANNED"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "COMPLETED"
  ).length;

  const totalBudget = projects.reduce(
    (sum, project) => sum + (project.budget ?? 0),
    0
  );

  const averageProgress =
    totalProjects === 0
      ? 0
      : Math.round(
          projects.reduce(
            (sum, project) =>
              sum + project.progress,
            0
          ) / totalProjects
        );

  const highRiskProjects = projects.filter(
    (project) =>
      project.riskLevel === "HIGH" ||
      project.riskLevel === "CRITICAL"
  ).length;

  const projectsWithoutIndicators = projects.filter(
    (project) =>
      project.indicators.length === 0
  ).length;

  const projectsWithoutUpdates = projects.filter(
    (project) =>
      project.updates.length === 0
  ).length;

  const statusDistribution = [
    {
      name: "Active",
      value: activeProjects,
    },
    {
      name: "Planned",
      value: plannedProjects,
    },
    {
      name: "Completed",
      value: completedProjects,
    },
  ];

  const programmePerformance = Object.values(
    projects.reduce(
      (acc, project) => {
        const name = project.programme.name;

        if (!acc[name]) {
          acc[name] = {
            name,
            projects: 0,
            progressTotal: 0,
          };
        }

        acc[name].projects += 1;
        acc[name].progressTotal += project.progress;

        return acc;
      },
      {} as Record<
        string,
        {
          name: string;
          projects: number;
          progressTotal: number;
        }
      >
    )
  ).map((item) => ({
    name: item.name,
    projects: item.projects,
    averageProgress: Math.round(
      item.progressTotal / item.projects
    ),
  }));

  const riskDistribution = {
    low: projects.filter(
      (project) =>
        project.riskLevel === "LOW"
    ).length,

    medium: projects.filter(
      (project) =>
        project.riskLevel === "MEDIUM"
    ).length,

    high: projects.filter(
      (project) =>
        project.riskLevel === "HIGH"
    ).length,

    critical: projects.filter(
      (project) =>
        project.riskLevel === "CRITICAL"
    ).length,
  };

  return {
    totalProjects,
    activeProjects,
    plannedProjects,
    completedProjects,
    totalBudget,
    averageProgress,
    highRiskProjects,
    projectsWithoutIndicators,
    projectsWithoutUpdates,
    statusDistribution,
    programmePerformance,
    riskDistribution,
  };
}