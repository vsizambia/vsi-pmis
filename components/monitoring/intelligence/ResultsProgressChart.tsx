"use client";

type ResultsProgressChartProps = {
  planned: number;
  achieved: number;
};

export default function ResultsProgressChart({
  planned,
  achieved,
}: ResultsProgressChartProps) {
  const percentage =
    planned === 0
      ? 0
      : Math.round(
          (achieved / planned) * 100
        );

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#003566]">
        Results Progress
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Comparison between planned and achieved results.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600">
              Planned Results
            </span>

            <span className="font-semibold">
              {planned}
            </span>
          </div>

          <div className="h-3 rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-blue-600"
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>


        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600">
              Achieved Results
            </span>

            <span className="font-semibold">
              {achieved}
            </span>
          </div>

          <div className="h-3 rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-green-600"
              style={{
                width: `${Math.min(
                  percentage,
                  100
                )}%`,
              }}
            />
          </div>
        </div>


        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">
            Achievement Gap
          </p>

          <p className="mt-1 text-2xl font-bold text-[#001d3d]">
            {Math.max(
              planned - achieved,
              0
            )}
          </p>
        </div>
      </div>
    </section>
  );
}