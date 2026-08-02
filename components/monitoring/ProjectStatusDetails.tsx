"use client";

type ProjectStatusDetailsProps = {
  projects: {
    id: string;
    name: string;
    status: string;
    progress: number;
    riskLevel: string;
  }[];
};

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Active Projects",
  PLANNED: "Planned Projects",
  COMPLETED: "Completed Projects",
  SUSPENDED: "Suspended Projects",
};

export default function ProjectStatusDetails({
  projects,
}: ProjectStatusDetailsProps) {
  const groupedProjects = projects.reduce(
    (groups, project) => {
      if (!groups[project.status]) {
        groups[project.status] = [];
      }

      groups[project.status].push(project);

      return groups;
    },
    {} as Record<string, ProjectStatusDetailsProps["projects"]>
  );

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Project Status Details
      </h2>

      <div className="space-y-6">
        {Object.entries(groupedProjects).map(
          ([status, statusProjects]) => (
            <div key={status}>
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-600">
                {STATUS_LABELS[status] ?? status}
                {" "}
                ({statusProjects.length})
              </h3>

              <div className="space-y-3">
                {statusProjects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">
                        {project.name}
                      </p>

                      <span className="text-sm text-gray-500">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="mt-2 text-sm text-gray-600">
                      Risk Level:{" "}
                      <span className="font-medium">
                        {project.riskLevel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}