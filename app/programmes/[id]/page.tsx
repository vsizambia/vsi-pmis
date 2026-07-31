import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProgrammeDetailsPage({ params }: Props) {
  const { id } = await params;

  const programme = await prisma.programme.findUnique({
    where: {
      id,
    },
    include: {
      directorate: true,

      projects: {
        orderBy: {
          createdAt: "desc",
        },
      },

      indicators: {
        orderBy: {
          name: "asc",
        },
      },

      _count: {
        select: {
          projects: true,
          indicators: true,
        },
      },
    },
  });

  if (!programme) {
    notFound();
  }

  return (
    <main className="p-8 space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            Programme Portfolio
          </p>

          <h1 className="text-4xl font-bold text-vsi-navy">
            {programme.name}
          </h1>

          <p className="mt-2 text-gray-600">
            {programme.description}
          </p>

        </div>

        <Link
          href="/programmes"
          className="rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          ← Back to Programmes
        </Link>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        <div className="rounded-xl bg-white shadow p-6">

          <p className="text-sm text-gray-500">
            Programme Code
          </p>

          <h2 className="mt-2 text-3xl font-bold text-vsi-navy">
            {programme.code ?? "N/A"}
          </h2>

        </div>

        <div className="rounded-xl bg-white shadow p-6">

          <p className="text-sm text-gray-500">
            Status
          </p>

          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {programme.status}
          </h2>

        </div>

        <div className="rounded-xl bg-white shadow p-6">

          <p className="text-sm text-gray-500">
            Projects
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {programme._count.projects}
          </h2>

        </div>

        <div className="rounded-xl bg-white shadow p-6">

          <p className="text-sm text-gray-500">
            Indicators
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {programme._count.indicators}
          </h2>

        </div>

        <div className="rounded-xl bg-white shadow p-6">

          <p className="text-sm text-gray-500">
            Programme Period
          </p>

          <h2 className="mt-2 text-xl font-bold">
            {programme.startYear} – {programme.endYear}
          </h2>

        </div>

      </div>

      <section className="rounded-xl bg-white shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Programme Information
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div>

            <p className="text-sm text-gray-500">
              Directorate
            </p>

            <p className="font-semibold mt-1">
              {programme.directorate.name}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Theme
            </p>

            <p className="font-semibold mt-1">
              {programme.theme ?? "-"}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Budget Ceiling
            </p>

            <p className="font-semibold mt-1">
              {programme.currency}{" "}
              {programme.budgetCeiling?.toLocaleString() ?? "Not Set"}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Programme Duration
            </p>

            <p className="font-semibold mt-1">
              {programme.startYear} - {programme.endYear}
            </p>

          </div>

        </div>

      </section>

      <div className="grid xl:grid-cols-2 gap-8">

        <section className="rounded-xl bg-white shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Projects
          </h2>

          {programme.projects.length === 0 ? (

            <p className="text-gray-500">
              No projects have been registered.
            </p>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">
                    Code
                  </th>

                  <th className="text-left">
                    Project
                  </th>

                  <th className="text-center">
                    Status
                  </th>

                  <th className="text-center">
                    Progress
                  </th>

                </tr>

              </thead>

              <tbody>

                {programme.projects.map((project) => (

                  <tr
                    key={project.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4">
                      {project.code ?? "-"}
                    </td>

                    <td>
                      {project.name}
                    </td>

                    <td className="text-center">
                      {project.status}
                    </td>

                    <td>

                      <div className="w-full bg-gray-200 rounded-full h-2">

                        <div
                          className="bg-vsi-yellow h-2 rounded-full"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />

                      </div>

                      <p className="text-xs mt-1 text-center">
                        {project.progress}%
                      </p>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </section>

        <section className="rounded-xl bg-white shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Indicators
          </h2>

          {programme.indicators.length === 0 ? (

            <p className="text-gray-500">
              No indicators registered.
            </p>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">
                    Code
                  </th>

                  <th className="text-left">
                    Indicator
                  </th>

                  <th className="text-center">
                    Baseline
                  </th>

                  <th className="text-center">
                    Target
                  </th>

                  <th className="text-center">
                    Achieved
                  </th>

                </tr>

              </thead>

              <tbody>

                {programme.indicators.map((indicator) => (

                  <tr
                    key={indicator.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4">
                      {indicator.code ?? "-"}
                    </td>

                    <td>
                      {indicator.name}
                    </td>

                    <td className="text-center">
                      {indicator.baseline ?? "-"}
                    </td>

                    <td className="text-center">
                      {indicator.target ?? "-"}
                    </td>

                    <td className="text-center">
                      {indicator.achieved ?? "-"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </section>

      </div>

    </main>
  );
}