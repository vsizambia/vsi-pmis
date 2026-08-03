type MEAlertsProps = {
  lowPerformingIndicators: number;
  projectsWithoutUpdates: number;
  highRiskProjects: number;
  delayedProjects: number;
};

export default function MEAlerts({
  lowPerformingIndicators,
  projectsWithoutUpdates,
  highRiskProjects,
  delayedProjects,
}: MEAlertsProps) {
  const alerts = [
    {
      label: "Low Performing Indicators",
      value: lowPerformingIndicators,
      description:
        "Indicators below expected achievement levels.",
    },
    {
      label: "Projects Without Updates",
      value: projectsWithoutUpdates,
      description:
        "Projects requiring progress reporting.",
    },
    {
      label: "High Risk Projects",
      value: highRiskProjects,
      description:
        "Projects requiring management intervention.",
    },
    {
      label: "Delayed Projects",
      value: delayedProjects,
      description:
        "Projects behind implementation timelines.",
    },
  ];

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-[#003566]">
          M&E Management Alerts
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Automated identification of results and implementation concerns.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {alerts.map((alert) => (
          <div
            key={alert.label}
            className="rounded-lg border p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#001d3d]">
                {alert.label}
              </h3>

              <span className="rounded-full bg-red-100 px-3 py-1 font-bold text-red-700">
                {alert.value}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {alert.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}