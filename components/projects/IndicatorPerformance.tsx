type Indicator = {
  id: string;
  name: string;
  baseline: string | null;
  target: string | null;
  achieved: string | null;
};

export default function IndicatorPerformance({
  indicators,
}: {
  indicators: Indicator[];
}) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">
        Indicators & Results
      </h2>

      <div className="mt-4 space-y-3">
        {indicators.length === 0 ? (
          <p className="text-gray-500">
            No indicators registered.
          </p>
        ) : (
          indicators.map((indicator) => (
            <div
              key={indicator.id}
              className="rounded-lg border p-4"
            >
              <p className="font-semibold">
                {indicator.name}
              </p>

              <div className="mt-2 grid gap-3 text-sm md:grid-cols-3">
                <div>
                  <span className="text-gray-500">
                    Baseline
                  </span>

                  <p>
                    {indicator.baseline ?? "-"}
                  </p>
                </div>

                <div>
                  <span className="text-gray-500">
                    Target
                  </span>

                  <p>
                    {indicator.target ?? "-"}
                  </p>
                </div>

                <div>
                  <span className="text-gray-500">
                    Achieved
                  </span>

                  <p>
                    {indicator.achieved ?? "-"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}