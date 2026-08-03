type BeneficiaryAnalyticsProps = {
  totalBeneficiaries: number;
  categories: {
    name: string;
    value: number;
  }[];
};

export default function BeneficiaryAnalytics({
  totalBeneficiaries,
  categories,
}: BeneficiaryAnalyticsProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-[#003566]">
          Beneficiary Analytics
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Analysis of people reached through programme interventions.
        </p>
      </div>

      <div className="mt-6">
        <div className="rounded-lg bg-blue-50 p-5">
          <p className="text-sm text-gray-600">
            Total Beneficiaries Reached
          </p>

          <p className="mt-2 text-4xl font-bold text-[#001d3d]">
            {totalBeneficiaries}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {categories.length === 0 ? (
          <p className="text-sm text-gray-500">
            No beneficiary categories registered.
          </p>
        ) : (
          categories.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <span className="text-sm font-medium text-gray-700">
                {category.name}
              </span>

              <span className="font-bold text-[#003566]">
                {category.value}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}