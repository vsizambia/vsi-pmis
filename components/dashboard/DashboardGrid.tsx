import {
  Activity,
  Building2,
  ClipboardList,
  FolderKanban,
  Target,
  Users,
} from "lucide-react";

import DashboardCard from "./DashboardCard";

interface DashboardGridProps {
  directorates: number;
  programmes: number;
  projects: number;
  activities: number;
  beneficiaries: number;
  indicators: number;
}

export default function DashboardGrid({
  directorates,
  programmes,
  projects,
  activities,
  beneficiaries,
  indicators,
}: DashboardGridProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      <DashboardCard
        title="Directorates"
        value={directorates}
        icon={Building2}
        colour="bg-blue-600"
      />

      <DashboardCard
        title="Programmes"
        value={programmes}
        icon={FolderKanban}
        colour="bg-indigo-600"
      />

      <DashboardCard
        title="Projects"
        value={projects}
        icon={ClipboardList}
        colour="bg-purple-600"
      />

      <DashboardCard
        title="Activities"
        value={activities}
        icon={Activity}
        colour="bg-green-600"
      />

      <DashboardCard
        title="Beneficiaries"
        value={beneficiaries}
        icon={Users}
        colour="bg-teal-600"
      />

      <DashboardCard
        title="Indicators"
        value={indicators}
        icon={Target}
        colour="bg-orange-500"
      />
    </section>
  );
}