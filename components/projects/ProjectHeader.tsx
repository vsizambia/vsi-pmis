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
    <section className="flex flex-col justify-between gap-5 rounded-xl border bg-white p-8 shadow-sm lg:flex-row">
      <div>
        <h1 className="text-3xl font-bold text-[#001d3d]">
          {project.name}
        </h1>

        <p className="mt-2 text-gray-600">
          {project.description ??
            "No description provided"}
        </p>

        <div className="mt-4 flex gap-3">
          <StatusBadge status={project.status} />

          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium">
            Risk: {project.riskLevel}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href="/projects"
          className="rounded-lg border px-5 py-3"
        >
          Back
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