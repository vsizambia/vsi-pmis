type RiskHeatMapProps = {
  data: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
};

export default function RiskHeatMap({
  data,
}: RiskHeatMapProps) {
  const risks = [
    {
      label: "Low Risk",
      value: data.low,
      className: "bg-green-100 text-green-700",
    },
    {
      label: "Medium Risk",
      value: data.medium,
      className: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "High Risk",
      value: data.high,
      className: "bg-orange-100 text-orange-700",
    },
    {
      label: "Critical Risk",
      value: data.critical,
      className: "bg-red-100 text-red-700",
    },
  ];

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#003566]">
        Portfolio Risk Overview
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Distribution of implementation risks across projects.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {risks.map((risk) => (
          <div
            key={risk.label}
            className={`rounded-lg p-5 ${risk.className}`}
          >
            <p className="text-sm font-medium">
              {risk.label}
            </p>

            <p className="mt-2 text-3xl font-bold">
              {risk.value}
            </p>

            <p className="mt-1 text-xs">
              project(s)
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}