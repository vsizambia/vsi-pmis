import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function BeneficiariesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      beneficiaries: true,
    },
  });

  if (!project) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold text-red-600">
          Project not found
        </h1>
      </div>
    );
  }

  const beneficiaries = project.beneficiaries;

  const genderTotals = {
    Female: beneficiaries
      .filter((b) => b.gender === "Female")
      .reduce((sum, b) => sum + b.number, 0),

    Male: beneficiaries
      .filter((b) => b.gender === "Male")
      .reduce((sum, b) => sum + b.number, 0),

    Other: beneficiaries
      .filter((b) => b.gender === "Other")
      .reduce((sum, b) => sum + b.number, 0),
  };

  const ageTotals = {
    "Children (0-17)": beneficiaries
      .filter((b) => b.ageGroup === "Children (0-17)")
      .reduce((sum, b) => sum + b.number, 0),

    "Youth (18-35)": beneficiaries
      .filter((b) => b.ageGroup === "Youth (18-35)")
      .reduce((sum, b) => sum + b.number, 0),

    "Adults (36+)": beneficiaries
      .filter((b) => b.ageGroup === "Adults (36+)")
      .reduce((sum, b) => sum + b.number, 0),
  };

  const totalBeneficiaries =
    genderTotals.Female +
    genderTotals.Male +
    genderTotals.Other;


  return (
    <div className="p-8 space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-vsi-navy">
            Beneficiaries
          </h1>

          <p className="text-gray-600 mt-2">
            {project.name}
          </p>
        </div>


        <Link
          href={`/projects/${id}/beneficiaries/new`}
          className="bg-vsi-navy text-white px-5 py-3 rounded-lg"
        >
          Add Beneficiary
        </Link>

      </div>



      {/* Summary */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        <SummaryCard
          title="Total Beneficiaries"
          value={totalBeneficiaries}
        />

        <SummaryCard
          title="Female"
          value={genderTotals.Female}
        />

        <SummaryCard
          title="Male"
          value={genderTotals.Male}
        />

        <SummaryCard
          title="Other"
          value={genderTotals.Other}
        />

      </div>



      {/* Age Groups */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold text-vsi-navy mb-5">
          Age Groups
        </h2>


        {Object.entries(ageTotals).map(
          ([label, value]) => (

            <div
              key={label}
              className="flex justify-between border-b py-3"
            >

              <span>
                {label}
              </span>

              <span className="font-bold text-vsi-navy">
                {value}
              </span>

            </div>

          )
        )}

      </div>



      {/* Records */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold text-vsi-navy mb-5">
          Beneficiary Records
        </h2>


        {beneficiaries.length === 0 ? (

          <p className="text-gray-500">
            No beneficiary records added yet.
          </p>

        ) : (

          <div className="space-y-4">

            {beneficiaries.map((beneficiary) => (

              <div
                key={beneficiary.id}
                className="border rounded-xl p-4 flex justify-between items-center"
              >

                <div>

                  <p className="font-bold">
                    {beneficiary.gender}
                  </p>

                  <p className="text-gray-600">
                    Age: {beneficiary.age} | {beneficiary.ageGroup}
                  </p>

                </div>


                <div className="text-2xl font-bold text-vsi-navy">
                  {beneficiary.number}
                </div>


              </div>

            ))}

          </div>

        )}

      </div>


    </div>
  );
}




function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border-t-4 border-vsi-yellow">

      <p className="text-gray-500">
        {title}
      </p>

      <p className="text-3xl font-bold text-vsi-navy mt-2">
        {value}
      </p>

    </div>
  );
}