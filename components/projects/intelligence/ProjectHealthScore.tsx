"use client";

type ProjectHealthScoreProps = {
  score: number;
  status: string;
  strengths: string[];
  warnings: string[];
  recommendations: string[];
};

const STATUS_STYLES: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  HEALTHY: {
    label: "Healthy",
    className: "bg-green-100 text-green-700",
  },

  Healthy: {
    label: "Healthy",
    className: "bg-green-100 text-green-700",
  },

  MODERATE: {
    label: "Moderate",
    className: "bg-blue-100 text-blue-700",
  },

  Moderate: {
    label: "Moderate",
    className: "bg-blue-100 text-blue-700",
  },

  ON_TRACK: {
    label: "On Track",
    className: "bg-blue-100 text-blue-700",
  },

  ATTENTION_REQUIRED: {
    label: "Attention Required",
    className: "bg-yellow-100 text-yellow-700",
  },

  "Attention Required": {
    label: "Attention Required",
    className: "bg-yellow-100 text-yellow-700",
  },

  CRITICAL: {
    label: "Critical",
    className: "bg-red-100 text-red-700",
  },
};

export default function ProjectHealthScore({
  score,
  status,
  strengths,
  warnings,
  recommendations,
}: ProjectHealthScoreProps) {
  const statusConfig =
    STATUS_STYLES[status] ??
    STATUS_STYLES.ATTENTION_REQUIRED;

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-bold text-[#003566]">
            Project Intelligence
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Automated assessment of implementation health.
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${statusConfig.className}`}
        >
          {statusConfig.label}
        </span>
      </div>


      <div className="mt-6 grid gap-6 md:grid-cols-3">

        <div>
          <p className="text-sm text-gray-500">
            Health Score
          </p>

          <p className="mt-2 text-4xl font-bold text-[#001d3d]">
            {score}%
          </p>

          <div className="mt-4 h-3 rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-emerald-600"
              style={{
                width: `${score}%`,
              }}
            />
          </div>
        </div>


        <div>
          <h3 className="font-semibold text-gray-700">
            Strengths
          </h3>

          <ul className="mt-2 space-y-1 text-sm text-green-700">
            {strengths.length === 0 ? (
              <li>No positive indicators.</li>
            ) : (
              strengths.map((item) => (
                <li key={item}>
                  ✓ {item}
                </li>
              ))
            )}
          </ul>
        </div>


        <div>
          <h3 className="font-semibold text-gray-700">
            Attention Areas
          </h3>

          <ul className="mt-2 space-y-1 text-sm text-red-700">
            {warnings.length === 0 ? (
              <li>No issues detected.</li>
            ) : (
              warnings.map((item) => (
                <li key={item}>
                  ⚠ {item}
                </li>
              ))
            )}
          </ul>
        </div>

      </div>


      <div className="mt-6 rounded-lg bg-slate-50 p-5">

        <h3 className="font-semibold text-[#003566]">
          Recommended Actions
        </h3>

        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {recommendations.length === 0 ? (
            <li>
              No immediate actions required.
            </li>
          ) : (
            recommendations.map((item) => (
              <li key={item}>
                → {item}
              </li>
            ))
          )}
        </ul>

      </div>

    </section>
  );
}