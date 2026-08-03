type ManagementAlertsProps = {
  highRiskProjects: number;
  projectsWithoutIndicators: number;
  projectsWithoutUpdates: number;
};

export default function ManagementAlerts({
  highRiskProjects,
  projectsWithoutIndicators,
  projectsWithoutUpdates,
}: ManagementAlertsProps) {
  const alerts = [
    {
      title: "High Risk Projects",
      value: highRiskProjects,
      message:
        "Projects requiring management attention due to elevated risk.",
    },
    {
      title: "Missing Indicators",
      value: projectsWithoutIndicators,
      message:
        "Projects without registered results measurement indicators.",
    },
    {
      title: "Missing Progress Updates",
      value: projectsWithoutUpdates,
      message:
        "Projects without recent implementation updates.",
    },
  ];

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#003566]">
        Management Alerts
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Issues requiring programme management action.
      </p>

      <div className="mt-6 space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.title}
            className="rounded-lg border p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#001d3d]">
                {alert.title}
              </h3>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-700">
                {alert.value}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              {alert.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}