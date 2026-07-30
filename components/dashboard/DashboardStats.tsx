import DashboardCard from "@/components/dashboard/DashboardCard";

import {
  Activity,
  Building2,
  ClipboardList,
  FolderKanban,
  Target,
  Users,
} from "lucide-react";

type DashboardStatsProps = {
  directorates: number;
  programmes: number;
  projects: number;
  activities: number;
  beneficiaries: number;
  indicators: number;
};

export default function DashboardStats({
  directorates,
  programmes,
  projects,
  activities,
  beneficiaries,
  indicators,
}: DashboardStatsProps) {
  const cards = [
    {
      title: "Directorates",
      value: directorates,
      description: "Active organisational units",
      icon: Building2,
      href: "/directorates",
    },
    {
      title: "Programmes",
      value: programmes,
      description: "Registered programmes",
      icon: Target,
      href: "/programmes",
    },
    {
      title: "Projects",
      value: projects,
      description: "Projects under management",
      icon: FolderKanban,
      href: "/projects",
    },
    {
      title: "Activities",
      value: activities,
      description: "Implementation activities",
      icon: ClipboardList,
      href: "/activities",
    },
    {
      title: "Beneficiaries",
      value: beneficiaries,
      description: "People reached",
      icon: Users,
      href: "/beneficiaries",
    },
    {
      title: "Indicators",
      value: indicators,
      description: "Performance indicators",
      icon: Activity,
      href: "/indicators",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <DashboardCard
          key={card.title}
          title={card.title}
          value={card.value}
          description={card.description}
          icon={card.icon}
          href={card.href}
        />
      ))}
    </section>
  );
}