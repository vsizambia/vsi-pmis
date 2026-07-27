import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const programme = await prisma.programme.findUnique({
    where: { id },

    include: {
      directorate: true,

      projects: {
        include: {
          activities: true,
          beneficiaries: true,
        },
        orderBy: {
          name: "asc",
        },
      },

      indicators: true,
    },
  });

  if (!programme) {
    notFound();
  }

  const beneficiaries = programme.projects.flatMap(
    (project) => project.beneficiaries
  );

  const gender = {
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

  const totalBeneficiaries =
    gender.Female + gender.Male + gender.Other;

  const ageGroups = beneficiaries.reduce(
    (groups, beneficiary) => {
      const group = beneficiary.ageGroup || "Unknown";

      groups[group] =
        (groups[group] || 0) + beneficiary.number;

      return groups;
    },
    {} as Record<string, number>
  );

  const totalActivities = programme.projects.reduce(
    (sum, project) => sum + project.activities.length,
    0
  );

  const totalBudget = programme.projects.reduce(
    (sum, project) => sum + (project.budget ?? 0),
    0
  );

  return (
    <div className="space-y-8">

      <div className="rounded-xl bg-vsi-navy p-8 text-white shadow">

        <p className="text-sm text-blue-200">
          Directorate: {programme.directorate.name}
        </p>

        <h1 className="mt-3 text-4xl font-bold text-vsi-yellow">
          {programme.name}
        </h1>

        <p className="mt-3 max-w-3xl text-blue-100">
          {programme.description}
        </p>

      </div>


      <div className="grid grid-cols-1 gap-5 md:grid-cols-5">

        <SummaryCard
          title="Projects"
          value={programme.projects.length}
        />

        <SummaryCard
          title="Activities"
          value={totalActivities}
        />

        <SummaryCard
          title="Indicators"
          value={programme.indicators.length}
        />

        <SummaryCard
          title="Beneficiaries"
          value={totalBeneficiaries}
        />

        <SummaryCard
          title="Budget"
          value={`ZMW ${totalBudget.toLocaleString("en-US")}`}
        />

      </div>


      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-bold text-vsi-navy">
            Gender Distribution
          </h2>

          <GenderRow label="Female" value={gender.Female} />
          <GenderRow label="Male" value={gender.Male} />
          <GenderRow label="Other" value={gender.Other} />

        </div>


        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-bold text-vsi-navy">
            Age Groups
          </h2>

          {Object.keys(ageGroups).length === 0 ? (

            <p className="text-gray-500">
              No age disaggregated data recorded.
            </p>

          ) : (

            Object.entries(ageGroups).map(([group, total]) => (

              <div
                key={group}
                className="flex justify-between border-b py-3"
              >

                <span>{group}</span>

                <strong className="text-vsi-navy">
                  {total}
                </strong>

              </div>

            ))

          )}

        </div>

      </div>


      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold text-vsi-navy">
          Projects
        </h2>


        <div className="space-y-5">

          {programme.projects.map((project) => (

            <div
              key={project.id}
              className="rounded-xl border p-5"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="text-lg font-bold">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-gray-600">
                    {project.description}
                  </p>

                </div>


                <StatusBadge status={project.status} />

              </div>


              <div className="mt-5 grid grid-cols-3 gap-4">

                <Metric
                  label="Activities"
                  value={project.activities.length}
                />

                <Metric
                  label="Beneficiaries"
                  value={
                    project.beneficiaries.reduce(
                      (sum, b) => sum + b.number,
                      0
                    )
                  }
                />

                <Metric
                  label="Budget"
                  value={`ZMW ${(project.budget ?? 0).toLocaleString("en-US")}`}
                />

              </div>


              <Link
                href={`/projects/${project.id}/beneficiaries`}
                className="mt-5 inline-block rounded-lg bg-vsi-navy px-4 py-2 text-white hover:bg-blue-900"
              >
                Manage Beneficiaries
              </Link>


            </div>

          ))}

        </div>

      </div>


      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-bold text-vsi-navy">
          Monitoring Indicators
        </h2>


        {programme.indicators.length === 0 && (

          <p className="text-gray-500">
            No indicators registered.
          </p>

        )}


        {programme.indicators.map((indicator) => {

          const target = Number(indicator.target ?? 0);
          const achieved = Number(indicator.achieved ?? 0);

          const progress =
            target > 0
              ? Math.min(
                  Math.round((achieved / target) * 100),
                  100
                )
              : 0;


          return (

            <div
              key={indicator.id}
              className="mb-4 rounded-xl border p-5"
            >

              <h3 className="font-bold">
                {indicator.name}
              </h3>


              <div className="mt-4">

                <div className="flex justify-between text-sm">

                  <span>
                    Progress
                  </span>

                  <span>
                    {progress}%
                  </span>

                </div>


                <div className="mt-2 h-3 rounded bg-gray-200">

                  <div
                    className="h-3 rounded bg-green-600"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}


function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="rounded-xl border-t-4 border-vsi-yellow bg-white p-5 shadow">

      <p className="text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-vsi-navy">
        {value}
      </p>

    </div>
  );
}


function GenderRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex justify-between border-b py-3">

      <span>
        {label}
      </span>

      <strong className="text-vsi-navy">
        {value}
      </strong>

    </div>
  );
}


function Metric({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="text-xl font-bold text-vsi-navy">
        {value}
      </p>

    </div>
  );
}


function StatusBadge({
  status,
}: {
  status: string;
}) {

  const styles: Record<string, string> = {
    Planned: "bg-blue-100 text-blue-700",
    Ongoing: "bg-yellow-100 text-yellow-700",
    Active: "bg-green-100 text-green-700",
    Completed: "bg-green-200 text-green-800",
    Delayed: "bg-red-100 text-red-700",
    Suspended: "bg-gray-200 text-gray-700",
  };


  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${
        styles[status] ?? "bg-blue-100 text-blue-700"
      }`}
    >
      {status}
    </span>
  );
}