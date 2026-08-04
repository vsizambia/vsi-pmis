import type {
  ProgrammeHealth as ProgrammeHealthType,
} from "@/types/dashboard";


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


function getScoreStyle(
  score: number,
) {
  if (score >= 70) {
    return "bg-green-500";
  }

  if (score >= 50) {
    return "bg-yellow-500";
  }

  return "bg-red-500";
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
          Overall implementation performance across VSI programmes.
        </p>
      </div>


      {data.length === 0 ? (
        <p className="text-sm text-gray-500">
          Programme health data will appear once implementation
          records are available.
        </p>
      ) : (

        <div className="space-y-5">

          {data.map((programme) => (

            <div
              key={programme.id}
              className="rounded-lg border border-gray-100 p-5"
            >

              <div className="flex items-start justify-between gap-4">

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {programme.programmeName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Overall implementation performance
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

                  <span className="text-gray-600">
                    Health Score
                  </span>


                  <span className="font-bold text-gray-900">
                    {programme.overallScore}%
                  </span>

                </div>


                <div className="mt-2 h-2 rounded-full bg-gray-100">

                  <div
                    className={`h-2 rounded-full ${getScoreStyle(
                      programme.overallScore,
                    )}`}
                    style={{
                      width: `${programme.overallScore}%`,
                    }}
                  />

                </div>

              </div>


              <div className="mt-5">

                <h4 className="mb-3 text-sm font-semibold text-gray-800">
                  Performance Drivers
                </h4>


                <div className="space-y-3">

                  {programme.healthDrivers.map(
                    (driver) => (

                      <div
                        key={driver.name}
                      >

                        <div className="mb-1 flex justify-between text-xs">

                          <span className="text-gray-600">
                            {driver.name}
                          </span>


                          <span className="font-medium text-gray-900">
                            {driver.score}%
                          </span>

                        </div>


                        <div className="h-1.5 rounded-full bg-gray-100">

                          <div
                            className={`h-1.5 rounded-full ${getScoreStyle(
                              driver.score,
                            )}`}
                            style={{
                              width: `${driver.score}%`,
                            }}
                          />

                        </div>

                      </div>

                    ),
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}