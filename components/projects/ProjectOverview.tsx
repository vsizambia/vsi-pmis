import { formatDate } from "@/lib/format";

type ProjectOverviewProps = {
  project: {
    programme: {
      name: string;
    };
    projectManager: {
      name: string;
    } | null;
    startDate: Date | null;
    endDate: Date | null;
    progress: number;
  };
};

export default function ProjectOverview({
  project,
}: ProjectOverviewProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-[#003566]">
        Project Information
      </h2>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <div>
          <p className="font-semibold">
            Programme
          </p>

          <p>
            {project.programme.name}
          </p>
        </div>

        <div>
          <p className="font-semibold">
            Project Manager
          </p>

          <p>
            {project.projectManager?.name ??
              "Not assigned"}
          </p>
        </div>

        <div>
          <p className="font-semibold">
            Timeline
          </p>

          <p>
            {formatDate(project.startDate)}
            {" - "}
            {formatDate(project.endDate)}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between">
          <span>
            Implementation Progress
          </span>

          <span>
            {project.progress}%
          </span>
        </div>

        <div className="h-3 rounded-full bg-gray-200">
          <div
            className="h-3 rounded-full bg-emerald-600"
            style={{
              width: `${project.progress}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}