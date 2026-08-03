type BudgetAnalysisProps = {
  totalBudget: number;
  data: {
    name: string;
    budget: number;
  }[];
};

export default function BudgetAnalysis({
  totalBudget,
  data,
}: BudgetAnalysisProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#003566]">
        Budget Analysis
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Distribution of project resources across programmes.
      </p>

      <div className="mt-5 rounded-lg bg-gray-50 p-4">
        <p className="text-sm text-gray-500">
          Total Portfolio Budget
        </p>

        <p className="mt-1 text-3xl font-bold text-[#001d3d]">
          K {totalBudget.toLocaleString()}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {data.length === 0 ? (
          <p className="text-sm text-gray-500">
            No budget allocation data available.
          </p>
        ) : (
          data.map((item) => {
            const percentage =
              totalBudget === 0
                ? 0
                : Math.round(
                    (item.budget / totalBudget) * 100
                  );

            return (
              <div key={item.name}>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {item.name}
                  </span>

                  <span className="text-sm font-semibold">
                    K {item.budget.toLocaleString()}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-emerald-600"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  {percentage}% of portfolio budget
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}