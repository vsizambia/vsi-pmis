import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import ExecutiveHeader from "@/components/dashboard/layout/ExecutiveHeader";

import KPIGrid from "@/components/dashboard/cards/KPIGrid";

import PortfolioOverview from "@/components/dashboard/sections/PortfolioOverview";
import OrganisationHealth from "@/components/dashboard/sections/OrganisationHealth";
import ProgrammeHealth from "@/components/dashboard/sections/ProgrammeHealth";
import GovernanceSummary from "@/components/dashboard/sections/GovernanceSummary";
import ExecutiveAlerts from "@/components/dashboard/sections/ExecutiveAlerts";
import RecentActivity from "@/components/dashboard/sections/RecentActivity";

import { getDashboardData } from "@/lib/dashboard/dashboard.service";


export default async function DashboardPage() {
  const dashboard = await getDashboardData();

  const kpiCards = [
    {
      title: "Directorates",
      value: dashboard.summary.totalDirectorates,
      subtitle: "VSI organisational units",
      statusColor: "primary" as const,
    },

    {
      title: "Programmes",
      value: dashboard.summary.totalProgrammes,
      subtitle: "VSI programme portfolio",
      statusColor: "info" as const,
    },

    {
      title: "Projects",
      value: dashboard.summary.totalProjects,
      subtitle: "Active VSI interventions",
      statusColor: "success" as const,
    },

    {
      title: "Beneficiaries",
      value: dashboard.summary.totalBeneficiaries.toLocaleString(),
      subtitle: "People reached through VSI programmes",
      statusColor: "primary" as const,
    },

    {
      title: "Activities",
      value: dashboard.summary.totalActivities,
      subtitle: "Implementation activities",
      statusColor: "warning" as const,
    },

    {
      title: "Indicators",
      value: dashboard.summary.totalIndicators,
      subtitle: "Programme performance indicators",
      statusColor: "info" as const,
    },

    {
      title: "Active Projects",
      value: dashboard.summary.activeProjects,
      subtitle: "Projects currently implementing",
      statusColor: "success" as const,
    },

    {
      title: "Completed Projects",
      value: dashboard.summary.completedProjects,
      subtitle: "Completed VSI projects",
      statusColor: "success" as const,
    },
  ];

  return (
    <DashboardLayout>

      <ExecutiveHeader
        title="VSI Executive Dashboard"
        subtitle="Visionary Students Initiative Programme Management Information System"
      />

      <KPIGrid cards={kpiCards} />

      <PortfolioOverview
        data={dashboard.portfolio}
      />

      <OrganisationHealth
        data={dashboard.organisationHealth}
      />

      <ProgrammeHealth
        data={dashboard.programmeHealth}
      />

      <GovernanceSummary
        data={dashboard.governance}
      />

      <ExecutiveAlerts
        data={dashboard.alerts}
      />

      <RecentActivity
        data={dashboard.recentActivities}
      />

    </DashboardLayout>
  );
}