interface ProgrammeSummaryProps {
  programmes: {
    id: string;
    name: string;
    projects: number;
    indicators: number;
  }[];
}

export default function ProgrammeSummary({
  programmes,
}: ProgrammeSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">

      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        Programme Performance
      </h2>

      <div className="space-y-4">

        {programmes.map((programme) => (
          <div
            key={programme.id}
            className="border-b pb-3"
          >

            <div className="flex justify-between items-center">

              <h3 className="font-medium text-gray-900">
                {programme.name}
              </h3>

              <span className="text-sm text-gray-600">
                {programme.projects} Projects
              </span>

            </div>


            <p className="text-sm text-gray-600 mt-1">
              Indicators tracked: {programme.indicators}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}