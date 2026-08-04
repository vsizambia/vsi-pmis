import { ReactNode } from "react";

import KPICard from "./KPICard";

import type { DashboardCard } from "@/types/dashboard";

interface KPIGridProps {
  cards: Array<
    DashboardCard & {
      icon?: ReactNode;
    }
  >;
}

export default function KPIGrid({
  cards,
}: KPIGridProps) {
  return (
    <section>
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