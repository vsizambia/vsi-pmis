type GeographicCoverageProps = {
  locations: {
    name: string;
    beneficiaries: number;
    projects: number;
  }[];
};

export default function GeographicCoverage({
  locations,
}: GeographicCoverageProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-[#003566]">
          Geographic Coverage
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Programme reach and implementation footprint by location.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {locations.length === 0 ? (
          <p className="text-sm text-gray-500">
            No geographic coverage data available.
          </p>
        ) : (
          locations.map((location) => (
            <div
              key={location.name}
              className="rounded-lg border p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#001d3d]">
                  {location.name}
                </h3>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                  {location.projects} Projects
                </span>
              </div>

              <div className="mt-3">
                <p className="text-sm text-gray-500">
                  Beneficiaries Reached
                </p>

                <p className="mt-1 text-2xl font-bold text-[#003566]">
                  {location.beneficiaries}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}