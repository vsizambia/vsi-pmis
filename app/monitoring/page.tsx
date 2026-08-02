import prisma from "@/lib/prisma";

import ProjectStatusChart from "@/components/monitoring/ProjectStatusChart";
import RiskProfileChart from "@/components/monitoring/RiskProfileChart";
import ProgressOverview from "@/components/monitoring/ProgressOverview";
import ProjectStatusDetails from "@/components/monitoring/ProjectStatusDetails";
import RiskProfileDetails from "@/components/monitoring/RiskProfileDetails";

export default async function MonitoringPage() {
  const [
    totalProjects,
    activeProjects,
    completedProjects,
    suspendedProjects,
    totalIndicators,
    totalActivities,
    totalBeneficiaries,
    budgetData,
    projectStatusData,
    riskData,
    progressData,
    topProjects,
    lowestProjects,
    monitoringProjects,
  ] = await Promise.all([
    prisma.project.count(),

    prisma.project.count({
      where: {
        status: "ACTIVE",
      },
    }),

    prisma.project.count({
      where: {
        status: "COMPLETED",
      },
    }),

    prisma.project.count({
      where: {
        status: "SUSPENDED",
      },
    }),

    prisma.indicator.count(),

    prisma.activity.count(),

    prisma.beneficiary.aggregate({
      _sum: {
        number: true,
      },
    }),

    prisma.project.aggregate({
      _sum: {
        budget: true,
      },
    }),

    prisma.project.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    }),

    prisma.project.groupBy({
      by: ["riskLevel"],
      _count: {
        riskLevel: true,
      },
    }),

    prisma.project.aggregate({
      _avg: {
        progress: true,
      },
    }),

    prisma.project.findMany({
      where: {
        progress: {
          gt: 0,
        },
      },
      orderBy: {
        progress: "desc",
      },
      take: 1,
      select: {
        name: true,
        progress: true,
      },
    }),

    prisma.project.findMany({
      where: {
        status: "ACTIVE",
        progress: {
          gt: 0,
        },
      },
      orderBy: {
        progress: "asc",
      },
      take: 1,
      select: {
        name: true,
        progress: true,
      },
    }),

    prisma.project.findMany({
      orderBy: {
        progress: "desc",
      },
      select: {
        id: true,
        name: true,
        status: true,
        progress: true,
        riskLevel: true,
      },
    }),
  ]);

  const cards = [
    {
      title: "Total Projects",
      value: totalProjects,
    },
    {
      title: "Active Projects",
      value: activeProjects,
    },
    {
      title: "Completed Projects",
      value: completedProjects,
    },
    {
      title: "Suspended Projects",
      value: suspendedProjects,
    },
    {
      title: "Indicators",
      value: totalIndicators,
    },
    {
      title: "Activities",
      value: totalActivities,
    },
    {
      title: "Beneficiaries",
      value: totalBeneficiaries._sum.number ?? 0,
    },
    {
      title: "Total Budget",
      value: `ZMW ${
        budgetData._sum.budget?.toLocaleString() ?? 0
      }`,
    },
  ];

  const statusChartData = [
    "ACTIVE",
    "PLANNED",
    "COMPLETED",
    "SUSPENDED",
  ].map((status) => {
    const existing = projectStatusData.find(
      (item) => item.status === status
    );

    return {
      status,
      count: existing?._count.status ?? 0,
    };
  });

  const riskChartData = riskData.map((item) => ({
    level: item.riskLevel ?? "LOW",
    count: item._count.riskLevel,
  }));

  const averageProgress = Math.round(
    progressData._avg.progress ?? 0
  );

  const topProject = topProjects[0] ?? null;

  const lowestProject = lowestProjects[0] ?? null;

  return (
    <main className="space-y-8 p-8">
      <section>
        <h1 className="text-3xl font-bold">
          Project Monitoring Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Enterprise monitoring of projects, results,
          activities, risks and beneficiaries.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500">
              {card.title}
            </p>

            <p className="mt-3 text-3xl font-bold">
              {card.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ProjectStatusChart
          data={statusChartData}
        />

        <RiskProfileChart
          data={riskChartData}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ProjectStatusDetails
          projects={monitoringProjects}
        />

        <RiskProfileDetails
          projects={monitoringProjects}
        />
      </section>

      <section>
        <ProgressOverview
          averageProgress={averageProgress}
          topProject={topProject}
          lowestProject={lowestProject}
        />
      </section>
    </main>
  );
}