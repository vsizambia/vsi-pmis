import Link from "next/link";

type Project = {
  id: string;
  name: string;
  status: string;
  programme: {
    name: string;
  } | null;
};

interface RecentProjectsProps {
  projects: Project[];
}

function getStatusClasses(status: string) {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-700";

    case "ONGOING":
      return "bg-amber-100 text-amber-700";

    case "PLANNED":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function RecentProjects({
  projects,
}: RecentProjectsProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Recent Projects
          </h2>

          <p className="text-sm text-slate-500">
            Latest registered implementation projects
          </p>
        </div>

        <Link
          href="/projects"
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
        >
          View All →
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 py-12 text-center">
          <p className="font-medium text-slate-700">
            No projects have been registered.
          </p>

          <Link
            href="/projects/new"
            className="mt-4 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Create Project
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Project
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Programme
                </th>

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {project.name}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {project.programme?.name ?? "Not Assigned"}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}