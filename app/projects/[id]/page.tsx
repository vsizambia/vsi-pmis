import prisma from "@/lib/prisma";
import Link from "next/link";

import StatusBadge from "@/components/common/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/format";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      programme: true,
      activities: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!project) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold text-[#001d3d]">
          Project Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#001d3d]">
            Project Details
          </h1>
          <p className="mt-2 text-gray-600">
            Project implementation profile
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/projects"
            className="rounded-lg border border-[#003566] px-5 py-3 text-[#003566] hover:bg-gray-100"
          >
            Back to Projects
          </Link>

          <Link
            href={`/projects/${project.id}/edit`}
            className="rounded-lg bg-[#003566] px-5 py-3 text-white hover:bg-[#001d3d]"
          >
            Edit Project
          </Link>
        </div>
      </div>

      {/* Project Information */}
      <div className="space-y-5 rounded-lg bg-white p-6 shadow">
        <h2 className="text-2xl font-semibold text-[#003566]">
          {project.name}
        </h2>

        <div>
          <h3 className="font-semibold text-gray-700">Description</h3>
          <p className="mt-1 text-gray-600">
            {project.description || "No description provided"}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-gray-700">Programme</h3>
            <p>{project.programme.name}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Status</h3>
            <StatusBadge status={project.status} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Budget</h3>
            <p>{formatCurrency(project.budget, project.currency)}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Currency</h3>
            <p>{project.currency}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Start Date</h3>
            <p>{formatDate(project.startDate)}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">End Date</h3>
            <p>{formatDate(project.endDate)}</p>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#003566]">
              Implementation Activities
            </h2>

            <p className="text-sm text-gray-500">
              {project.activities.length} activity(ies) registered
            </p>
          </div>

          <Link
            href={`/activities/new?projectId=${project.id}`}
            className="rounded-lg bg-[#ffc300] px-4 py-2 font-medium text-[#000814] hover:bg-[#ffd60a]"
          >
            Add Activity
          </Link>
        </div>

        <div className="space-y-3">
          {project.activities.length === 0 ? (
            <p className="text-gray-500">
              No activities registered for this project.
            </p>
          ) : (
            project.activities.map((activity) => (
              <Link
                key={activity.id}
                href={`/activities/${activity.id}`}
                className="block rounded-lg border p-4 transition hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[#001d3d]">
                      {activity.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {activity.description || "No description"}
                    </p>
                  </div>

                  <StatusBadge status={activity.status} />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}