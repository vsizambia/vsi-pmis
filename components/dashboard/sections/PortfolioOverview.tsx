import {
  FolderKanban,
  CheckCircle,
  Activity,
  Users,
  Target,
} from "lucide-react";

import KPICard from "@/components/dashboard/cards/KPICard";

import type { PortfolioOverview as PortfolioOverviewType } from "@/types/dashboard";

interface PortfolioOverviewProps {
  data: PortfolioOverviewType;
}

export default function PortfolioOverview({
  data,
}: PortfolioOverviewProps) {
  const cards = [
    {
      title: "Active Programmes",
      value: data.activeProgrammes,
      subtitle: "Current organisational programmes",
      icon: (
        <FolderKanban className="h-5 w-5 text-blue-600" />
      ),
      statusColor: "primary" as const,
    },

    {
      title: "Active Projects",
      value: data.activeProjects,
      subtitle: "Projects currently implementing",
      icon: (
        <Activity className="h-5 w-5 text-green-600" />
      ),
      statusColor: "success" as const,
    },

    {
      title: "Completed Projects",
      value: data.completedProjects,
      subtitle: "Projects successfully completed",
      icon: (
        <CheckCircle className="h-5 w-5 text-green-600" />
      ),
      statusColor: "success" as const,
    },

    {
      title: "Beneficiaries Reached",
      value: data.beneficiariesReached.toLocaleString(),
      subtitle: "People reached through programmes",
      icon: (
        <Users className="h-5 w-5 text-purple-600" />
      ),
      statusColor: "info" as const,
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-gray-700" />

        <h2 className="text-xl font-semibold text-gray-900">
          Portfolio Performance
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <KPICard
            key={card.title}
            {...card}
          />
        ))}
      </div>
    </section>
  );
}