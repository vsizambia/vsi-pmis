type TargetAchievementProps = {
  target: number;
  achieved: number;
  label?: string;
};

export default function TargetAchievement({
  target,
  achieved,
  label = "Indicator Achievement",
}: TargetAchievementProps) {
  const percentage =
    target === 0
      ? 0
      : Math.round(
          (achieved / target) * 100
        );

  let status = "Critical";

  if (percentage >= 80) {
    status = "On Track";
  } else if (percentage >= 50) {
    status = "Needs Attention";
  }

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#003566]">
        {label}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Progress against planned indicator targets.
      </p>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Achievement
          </span>

          <span className="text-2xl font-bold text-[#001d3d]">
            {percentage}%
          </span>
        </div>

        <div className="mt-4 h-4 rounded-full bg-gray-200">
          <div
            className="h-4 rounded-full bg-green-600"
            style={{
              width: `${Math.min(
                percentage,
                100
              )}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-gray-600">
            Target
          </p>

          <p className="mt-1 text-xl font-bold text-[#001d3d]">
            {target}
          </p>
        </div>

        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm text-gray-600">
            Achieved
          </p>

          <p className="mt-1 text-xl font-bold text-green-700">
            {achieved}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-lg border p-4">
        <p className="text-sm text-gray-500">
          Performance Status
        </p>

        <p className="mt-1 font-semibold text-[#003566]">
          {status}
        </p>
      </div>
    </section>
  );
}