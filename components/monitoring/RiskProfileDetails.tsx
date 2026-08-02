"use client";

type RiskProfileDetailsProps = {
  projects: {
    id: string;
    name: string;
    progress: number;
    riskLevel: string;
    status: string;
  }[];
};

const RISK_LABELS: Record<string, string> = {
  LOW: "Low Risk Projects",
  MEDIUM: "Medium Risk Projects",
  HIGH: "High Risk Projects",
  CRITICAL: "Critical Risk Projects",
};

export default function RiskProfileDetails({
  projects,
}: RiskProfileDetailsProps) {
  const groupedProjects = projects.reduce(
    (groups, project) => {
      if (!groups[project.riskLevel]) {
        groups[project.riskLevel] = [];
      }

      groups[project.riskLevel].push(project);

      return groups;
    },
    {} as Record<string, RiskProfileDetailsProps["projects"]>
  );

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Risk Profile Details
      </h2>

      <div className="space-y-6">
        {Object.entries(groupedProjects).map(
          ([risk, riskProjects]) => (
            <div key={risk}>
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-600">
                {RISK_LABELS[risk] ?? risk}
                {" "}
                ({riskProjects.length})
              </h3>

              <div className="space-y-3">
                {riskProjects.map((project) => (
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

                    <p className="mt-2 text-sm text-gray-600">
                      Status: {project.status}
                    </p>
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