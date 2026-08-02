"use client";

type ProjectSummary = {
  name: string;
  progress: number;
};

type ProgressOverviewProps = {
  averageProgress: number;
  topProject?: ProjectSummary | null;
  lowestProject?: ProjectSummary | null;
};

export default function ProgressOverview({
  averageProgress,
  topProject,
  lowestProject,
}: ProgressOverviewProps) {
  const average = Math.max(0, Math.min(100, averageProgress));

  const highest = topProject && topProject.progress > 0
    ? topProject
    : null;

  const lowest = lowestProject && lowestProject.progress > 0
    ? lowestProject
    : null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">
        Portfolio Progress Overview
      </h2>

      <div className="mt-6 space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Average Completion
            </p>

            <span className="font-bold">
              {average}%
            </span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${average}%`,
              }}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">
              Highest Performing Project
            </p>

            <p className="mt-2 font-semibold">
              {highest?.name ?? "No completed progress yet"}
            </p>

            <p className="text-2xl font-bold text-green-600">
              {highest?.progress ?? 0}%
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">
              Lowest Performing Project
            </p>

            <p className="mt-2 font-semibold">
              {lowest?.name ?? "No active projects"}
            </p>

            <p className="text-2xl font-bold text-amber-600">
              {lowest?.progress ?? 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}