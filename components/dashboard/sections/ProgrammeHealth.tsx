import type { ProgrammeHealth as ProgrammeHealthType } from "@/types/dashboard";

interface ProgrammeHealthProps {
  data: ProgrammeHealthType[];
}

function getStatusStyle(
  status: ProgrammeHealthType["status"],
) {
  switch (status) {
    case "Excellent":
      return "bg-green-100 text-green-700";

    case "Good":
      return "bg-blue-100 text-blue-700";

    case "Fair":
      return "bg-yellow-100 text-yellow-700";

    case "Poor":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function ProgrammeHealth({
  data,
}: ProgrammeHealthProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Programme Health
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Overall implementation performance across programmes.
        </p>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-gray-500">
          Programme health data will appear once MEAL indicators
          and implementation scores are configured.
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((programme) => (
            <div
              key={programme.id}
              className="rounded-lg border border-gray-100 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {programme.programmeName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Overall performance score
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                    programme.status,
                  )}`}
                >
                  {programme.status}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span>Health Score</span>

                  <span className="font-semibold">
                    {programme.overallScore}%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{
                      width: `${programme.overallScore}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}