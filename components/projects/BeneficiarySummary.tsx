type Beneficiary = {
  id: string;
  number: number;
  gender: string;
  ageGroup: string;
};

export default function BeneficiarySummary({
  beneficiaries,
}: {
  beneficiaries: Beneficiary[];
}) {
  const total = beneficiaries.reduce(
    (sum, item) => sum + item.number,
    0
  );

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">
        Beneficiary Summary
      </h2>

      <p className="mt-3 text-3xl font-bold text-emerald-600">
        {total}
      </p>

      <p className="text-sm text-gray-500">
        Total beneficiaries reached
      </p>

      <div className="mt-5 space-y-2">
        {beneficiaries.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b pb-2 text-sm"
          >
            <span>
              {item.gender} - {item.ageGroup}
            </span>

            <span className="font-semibold">
              {item.number}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}