type OutcomePerformanceProps = {
  outcomes: {
    name: string;
    target: number;
    achieved: number;
  }[];
};

export default function OutcomePerformance({
  outcomes,
}: OutcomePerformanceProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-[#003566]">
          Outcome Performance
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Programme-level outcome achievement tracking.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {outcomes.length === 0 ? (
          <p className="text-sm text-gray-500">
            No outcome results registered.
          </p>
        ) : (
          outcomes.map((outcome) => {
            const percentage =
              outcome.target === 0
                ? 0
                : Math.round(
                    (outcome.achieved /
                      outcome.target) *
                      100
                  );

            return (
              <div
                key={outcome.name}
                className="rounded-lg border p-4"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold text-[#001d3d]">
                    {outcome.name}
                  </h3>

                  <span className="font-bold">
                    {percentage}%
                  </span>
                </div>

                <div className="mt-3 h-3 rounded-full bg-gray-200">
                  <div
                    className="h-3 rounded-full bg-blue-600"
                    style={{
                      width: `${Math.min(
                        percentage,
                        100
                      )}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex justify-between text-sm text-gray-600">
                  <span>
                    Target: {outcome.target}
                  </span>

                  <span>
                    Achieved: {outcome.achieved}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}