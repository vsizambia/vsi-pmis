type IndicatorDashboardProps = {
  totalIndicators: number;
  achievedIndicators: number;
  achievementRate: number;
};

export default function IndicatorDashboard({
  totalIndicators,
  achievedIndicators,
  achievementRate,
}: IndicatorDashboardProps) {
  let status = "Needs Attention";

  if (achievementRate >= 80) {
    status = "Strong Results Performance";
  } else if (achievementRate >= 50) {
    status = "Moderate Results Performance";
  }

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-[#003566]">
          Indicator Performance
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Results achievement against registered project indicators.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-gray-600">
            Total Indicators
          </p>

          <p className="mt-2 text-3xl font-bold text-[#001d3d]">
            {totalIndicators}
          </p>
        </div>

        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm text-gray-600">
            Achieved Indicators
          </p>

          <p className="mt-2 text-3xl font-bold text-green-700">
            {achievedIndicators}
          </p>
        </div>

        <div className="rounded-lg bg-yellow-50 p-4">
          <p className="text-sm text-gray-600">
            Achievement Rate
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-700">
            {achievementRate}%
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-lg border p-4">
        <p className="text-sm text-gray-500">
          Results Assessment
        </p>

        <p className="mt-1 font-semibold text-[#003566]">
          {status}
        </p>
      </div>
    </section>
  );
}