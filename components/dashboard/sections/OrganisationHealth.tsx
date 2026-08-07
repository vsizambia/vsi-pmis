import type {
  OrganisationHealth as OrganisationHealthType,
} from "@/types/dashboard";


interface Props {
  data: OrganisationHealthType;
}


export default function OrganisationHealth({
  data,
}: Props) {
  return (
    <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Organisation Health Intelligence
        </h2>

        <p className="text-sm text-gray-500">
          Executive assessment of VSI organisational readiness and performance.
        </p>
      </div>


      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

        <Metric
          label="Health Score"
          value={`${data.healthScore}%`}
        />

        <Metric
          label="Operational Readiness"
          value={`${data.operationalReadiness}%`}
        />

        <Metric
          label="Governance Readiness"
          value={`${data.governanceReadiness}%`}
        />

        <Metric
          label="Data Confidence"
          value={`${data.dataConfidence}%`}
        />

      </div>


      {data.recommendations.length > 0 && (
        <div className="mt-6">

          <h3 className="font-medium">
            Executive Recommendations
          </h3>

          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600">

            {data.recommendations.map(
              (item) => (
                <li key={item}>
                  {item}
                </li>
              ),
            )}

          </ul>

        </div>
      )}

    </section>
  );
}


function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-gray-50 p-4">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>

    </div>
  );
}