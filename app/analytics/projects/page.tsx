import prisma from "@/lib/prisma";
import { calculateProjectAnalytics } from "@/lib/project-analytics";

import PortfolioMetrics from "@/components/projects/analytics/PortfolioMetrics";
import ProjectStatusDistribution from "@/components/projects/analytics/ProjectStatusDistribution";
import ProgrammePerformance from "@/components/projects/analytics/ProgrammePerformance";
import BudgetAnalysis from "@/components/projects/analytics/BudgetAnalysis";
import RiskHeatMap from "@/components/projects/analytics/RiskHeatMap";
import ManagementAlerts from "@/components/projects/analytics/ManagementAlerts";
import ProgressPerformance from "@/components/projects/analytics/ProgressPerformance";

export default async function ProjectAnalyticsPage() {
  const projects = await prisma.project.findMany({
    include: {
      programme: true,
      indicators: true,
      updates: true,
      risks: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const analytics = calculateProjectAnalytics(projects);

  const projectsNeedingAttention =
    analytics.highRiskProjects +
    analytics.projectsWithoutIndicators +
    analytics.projectsWithoutUpdates;

  const budgetByProgramme =
    Object.values(
      projects.reduce(
        (
          acc,
          project
        ) => {
          const name = project.programme.name;

          if (!acc[name]) {
            acc[name] = {
              name,
              budget: 0,
            };
          }

          acc[name].budget += project.budget ?? 0;

          return acc;
        },
        {} as Record<
          string,
          {
            name: string;
            budget: number;
          }
        >
      )
    );

  return (
    <main className="space-y-8 p-8">
      <section>
        <h1 className="text-3xl font-bold text-[#001d3d]">
          Project Analytics Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Executive view of portfolio performance, risks, budgets and implementation progress.
        </p>
      </section>

      <PortfolioMetrics
        totalProjects={analytics.totalProjects}
        activeProjects={analytics.activeProjects}
        totalBudget={analytics.totalBudget}
        averageProgress={analytics.averageProgress}
        highRiskProjects={analytics.highRiskProjects}
        projectsNeedingAttention={
          projectsNeedingAttention
        }
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <ProgressPerformance
          averageProgress={
            analytics.averageProgress
          }
        />

        <ProjectStatusDistribution
          data={
            analytics.statusDistribution
          }
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ProgrammePerformance
          data={
            analytics.programmePerformance
          }
        />

        <BudgetAnalysis
          totalBudget={
            analytics.totalBudget
          }
          data={
            budgetByProgramme
          }
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <RiskHeatMap
          data={
            analytics.riskDistribution
          }
        />

        <ManagementAlerts
          highRiskProjects={
            analytics.highRiskProjects
          }
          projectsWithoutIndicators={
            analytics.projectsWithoutIndicators
          }
          projectsWithoutUpdates={
            analytics.projectsWithoutUpdates
          }
        />
      </section>
    </main>
  );
}