import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  CalendarCheck,
} from "lucide-react";

import KPICard from "@/components/dashboard/cards/KPICard";

import type { GovernanceSummary as GovernanceSummaryType } from "@/types/dashboard";

interface GovernanceSummaryProps {
  data: GovernanceSummaryType;
}

export default function GovernanceSummary({
  data,
}: GovernanceSummaryProps) {
  const cards = [
    {
      title: "High Risks",
      value: data.highRisks,
      subtitle: "Critical risks requiring attention",
      icon: (
        <AlertTriangle className="h-5 w-5 text-red-600" />
      ),
      statusColor: "danger" as const,
    },

    {
      title: "Medium Risks",
      value: data.mediumRisks,
      subtitle: "Risks under monitoring",
      icon: (
        <ShieldCheck className="h-5 w-5 text-yellow-600" />
      ),
      statusColor: "warning" as const,
    },

    {
      title: "Compliance Rate",
      value: `${data.complianceRate}%`,
      subtitle: "Organisation compliance status",
      icon: (
        <FileCheck className="h-5 w-5 text-green-600" />
      ),
      statusColor: "success" as const,
    },

    {
      title: "Upcoming Audits",
      value: data.auditsScheduled,
      subtitle: "Scheduled governance reviews",
      icon: (
        <CalendarCheck className="h-5 w-5 text-blue-600" />
      ),
      statusColor: "info" as const,
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Governance & Compliance
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Current governance position and accountability indicators.
        </p>
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