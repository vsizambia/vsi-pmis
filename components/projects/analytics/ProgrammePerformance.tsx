type ProgrammePerformanceProps = {
  data: {
    name: string;
    projects: number;
    averageProgress: number;
  }[];
};

export default function ProgrammePerformance({
  data,
}: ProgrammePerformanceProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#003566]">
        Programme Performance
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Average implementation progress by programme.
      </p>

      <div className="mt-6 space-y-5">
        {data.length === 0 ? (
          <p className="text-sm text-gray-500">
            No programme performance data available.
          </p>
        ) : (
          data.map((programme) => (
            <div key={programme.name}>
              <div className="mb-2 flex justify-between">
                <div>
                  <p className="font-medium text-[#001d3d]">
                    {programme.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {programme.projects} project(s)
                  </p>
                </div>

                <span className="font-semibold">
                  {programme.averageProgress}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-gray-200">
                <div
                  className="h-3 rounded-full bg-[#003566]"
                  style={{
                    width: `${programme.averageProgress}%`,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}