import Link from "next/link";
import prisma from "@/lib/prisma";

import StatusBadge from "@/components/common/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/format";

import {
  CheckCircle2,
  Clock3,
  FolderKanban,
  PlayCircle,
  Wallet,
} from "lucide-react";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      programme: true,
      projectManager: true,
      _count: {
        select: {
          activities: true,
          beneficiaries: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalProjects = projects.length;

  const plannedProjects = projects.filter(
    (project) => project.status.toLowerCase() === "planned"
  ).length;

  const ongoingProjects = projects.filter(
    (project) => project.status.toLowerCase() === "ongoing"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status.toLowerCase() === "completed"
  ).length;

  const totalBudget = projects.reduce(
    (sum, project) => sum + (project.budget ?? 0),
    0
  );

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: FolderKanban,
    },
    {
      title: "Planned",
      value: plannedProjects,
      icon: Clock3,
    },
    {
      title: "Ongoing",
      value: ongoingProjects,
      icon: PlayCircle,
    },
    {
      title: "Completed",
      value: completedProjects,
      icon: CheckCircle2,
    },
    {
      title: "Total Budget",
      value: formatCurrency(totalBudget, "ZMW"),
      icon: Wallet,
    },
  ];

  return (
    <main className="space-y-10">
      {/* Header */}
      <section className="flex flex-col gap-6 rounded-2xl border bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Project Management
          </h1>

          <p className="mt-2 text-slate-600">
            Manage VSI projects, implementation progress, budgets,
            activities and beneficiaries.
          </p>
        </div>

        <Link
          href="/projects/new"
          className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          + New Project
        </Link>
      </section>

      {/* Statistics */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-emerald-600" />
              </div>

              <p className="mt-4 text-sm text-slate-500">
                {stat.title}
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </section>

      {/* Projects Table */}
      <section className="rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Registered Projects
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Overview of all projects currently managed in VSI-PMIS
            </p>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <FolderKanban className="mx-auto mb-3 h-10 w-10 text-slate-400" />

            <p>No projects have been registered yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Project
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Programme
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Manager
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Budget
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Timeline
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">
                        {project.name}
                      </div>

                      <div className="mt-1 text-sm text-slate-500">
                        {project._count.activities} activities •{" "}
                        {project._count.beneficiaries} beneficiaries
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {project.programme.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {project.projectManager?.name ?? "Not assigned"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatCurrency(
                        project.budget,
                        project.currency
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div>{formatDate(project.startDate)}</div>

                      <div>
                        to {formatDate(project.endDate)}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge
                        status={project.status}
                      />
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/projects/${project.id}`}
                          className="rounded-lg border px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                          View
                        </Link>

                        <Link
                          href={`/projects/${project.id}/edit`}
                          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}