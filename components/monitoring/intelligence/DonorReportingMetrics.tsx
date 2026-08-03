type DonorReportingMetricsProps = {
  activeProjects: number;
  totalBudget: number;
  beneficiariesReached: number;
  achievedResults: number;
};

export default function DonorReportingMetrics({
  activeProjects,
  totalBudget,
  beneficiariesReached,
  achievedResults,
}: DonorReportingMetricsProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-[#003566]">
          Donor Reporting Metrics
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Key portfolio indicators for partner and donor reporting.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-gray-600">
            Active Projects
          </p>

          <p className="mt-2 text-3xl font-bold text-[#001d3d]">
            {activeProjects}
          </p>
        </div>

        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm text-gray-600">
            Investment
          </p>

          <p className="mt-2 text-2xl font-bold text-green-700">
            {totalBudget.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg bg-yellow-50 p-4">
          <p className="text-sm text-gray-600">
            Beneficiaries
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-700">
            {beneficiariesReached}
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 p-4">
          <p className="text-sm text-gray-600">
            Results Achieved
          </p>

          <p className="mt-2 text-3xl font-bold text-purple-700">
            {achievedResults}
          </p>
        </div>
      </div>
    </section>
  );
}