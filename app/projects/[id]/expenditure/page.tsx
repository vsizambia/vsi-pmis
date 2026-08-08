import Link from "next/link";
import prisma from "@/lib/prisma";
import ExpenditureForm from "./ExpenditureForm";

export default async function ProjectExpenditurePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      budget: true,
      currency: true,
      programme: {
        select: {
          name: true,
        },
      },
      expenditures: {
        orderBy: {
          transactionDate: "desc",
        },
      },
    },
  });

  if (!project) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">
          Project Not Found
        </h1>
      </main>
    );
  }

  const totalSpent = project.expenditures.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  const remainingBudget = Math.max(
    Number(project.budget ?? 0) - totalSpent,
    0,
  );

  const utilisation =
    Number(project.budget ?? 0) > 0
      ? Math.round(
          (totalSpent /
            Number(project.budget)) *
            100,
        )
      : 0;

  return (
    <main className="space-y-8 p-8">
      <div>
        <Link
          href={`/projects/${project.id}`}
          className="text-sm text-blue-600"
        >
          ← Back to Project
        </Link>

        <h1 className="mt-3 text-3xl font-bold">
          Project Expenditure
        </h1>

        <p className="mt-1 text-gray-600">
          {project.name}
        </p>

        <p className="text-sm text-gray-500">
          {project.programme.name}
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Project Budget
          </p>
          <p className="mt-2 text-xl font-bold">
            ZMW{" "}
            {Number(project.budget ?? 0).toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Expenditure Recorded
          </p>
          <p className="mt-2 text-xl font-bold">
            ZMW {totalSpent.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Remaining Budget
          </p>
          <p className="mt-2 text-xl font-bold">
            ZMW {remainingBudget.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Budget Utilisation
          </p>
          <p className="mt-2 text-xl font-bold">
            {utilisation}%
          </p>
        </div>
      </section>

      <ExpenditureForm projectId={project.id} />

      <section className="rounded-xl bg-white shadow">
        <div className="border-b p-5">
          <h2 className="text-xl font-semibold">
            Expenditure Transactions
          </h2>
        </div>

        {project.expenditures.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No expenditure transactions have been
            recorded for this project.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Reference</th>
                  <th className="p-4 text-right">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {project.expenditures.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="border-b"
                    >
                      <td className="p-4">
                        {new Date(
                          item.transactionDate,
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        {item.category}
                      </td>

                      <td className="p-4">
                        {item.description}
                      </td>

                      <td className="p-4">
                        {item.reference || "—"}
                      </td>

                      <td className="p-4 text-right font-medium">
                        ZMW{" "}
                        {Number(
                          item.amount,
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
