type PortfolioMetricsProps = {
  totalProjects: number;
  activeProjects: number;
  totalBudget: number;
  averageProgress: number;
  highRiskProjects: number;
  projectsNeedingAttention: number;
};

export default function PortfolioMetrics({
  totalProjects,
  activeProjects,
  totalBudget,
  averageProgress,
  highRiskProjects,
  projectsNeedingAttention,
}: PortfolioMetricsProps) {
  const cards = [
    {
      label: "Total Projects",
      value: totalProjects,
    },
    {
      label: "Active Projects",
      value: activeProjects,
    },
    {
      label: "Portfolio Budget",
      value: `K ${totalBudget.toLocaleString()}`,
    },
    {
      label: "Average Progress",
      value: `${averageProgress}%`,
    },
    {
      label: "High Risk Projects",
      value: highRiskProjects,
    },
    {
      label: "Attention Required",
      value: projectsNeedingAttention,
    },
  ];

  return (
    <section className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-gray-500">
            {card.label}
          </p>

          <p className="mt-2 text-2xl font-bold text-[#001d3d]">
            {card.value}
          </p>
        </div>
      ))}
    </section>
  );
}