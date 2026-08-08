import Link from "next/link";

import StatusBadge from "@/components/common/StatusBadge";

type ProjectHeaderProps = {
  project: {
    id: string;
    name: string;
    description: string | null;
    status: string;
    riskLevel: string;
  };
};

export default function ProjectHeader({
  project,
}: ProjectHeaderProps) {
  return (
    <section className="flex flex-col gap-6 rounded-xl border bg-white p-6 shadow-sm md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {project.name}
        </h1>

        <p className="mt-2 text-gray-600">
          {project.description ?? "No description provided"}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <StatusBadge status={project.status} />

          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium">
            Risk: {project.riskLevel}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="rounded-lg border px-5 py-3"
        >
          Back
        </Link>

        <Link
          href={`/projects/${project.id}/expenditure`}
          className="rounded-lg border border-emerald-600 px-5 py-3 text-emerald-700 hover:bg-emerald-50"
        >
          Expenditure
        </Link>

        <Link
          href={`/projects/${project.id}/edit`}
          className="rounded-lg bg-emerald-600 px-5 py-3 text-white"
        >
          Edit Project
        </Link>
      </div>
    </section>
  );
}
