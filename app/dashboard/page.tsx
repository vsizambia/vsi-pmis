import Link from "next/link";
import prisma from "@/lib/prisma";

import DashboardStats from "@/components/dashboard/DashboardStats";
import ProjectStatusChart from "@/components/dashboard/ProjectStatusChart";
import ProgrammeSummary from "@/components/dashboard/ProgrammeSummary";
import RecentProjects from "@/components/dashboard/RecentProjects";
import RecentActivities from "@/components/dashboard/RecentActivities";
import ProgrammeProgressChart from "@/components/dashboard/ProgrammeProgressChart";
import QuickActions from "@/components/dashboard/QuickActions";

import {
  Activity,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default async function DashboardPage() {
  const [
    directorates,
    programmes,
    projects,
    activities,
    beneficiaries,
    indicators,
    recentActivities,
    programmeProgress,
  ] = await Promise.all([
    prisma.directorate.count(),

    prisma.programme.findMany({
      orderBy: {
        name: "asc",
      },
    }),

    prisma.project.findMany({
      include: {
        programme: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

    prisma.activity.count(),

    prisma.beneficiary.count(),

    prisma.indicator.count(),

    prisma.activity.findMany({
      include: {
        project: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

    prisma.programme.findMany({
      include: {
        projects: true,
      },
    }),
  ]);

  const plannedProjects = projects.filter(
    (project) => project.status === "PLANNED"
  ).length;

  const ongoingProjects = projects.filter(
    (project) => project.status === "ONGOING"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "COMPLETED"
  ).length;

  const projectStatus = [
    {
      name: "Planned",
      value: plannedProjects,
      icon: Clock3,
    },
    {
      name: "Ongoing",
      value: ongoingProjects,
      icon: Activity,
    },
    {
      name: "Completed",
      value: completedProjects,
      icon: CheckCircle2,
    },
  ];

  const programmeProgressData = programmeProgress.map((programme) => ({
    name: programme.name,
    projects: programme.projects.length,
  }));

  return (
    <main className="space-y-8">
      <section className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            VSI Programme Management Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Monitor programmes, projects, activities, beneficiaries and
            performance indicators across the VSI portfolio.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects/new"
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            + New Project
          </Link>

          <Link
            href="/activities/new"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            + New Activity
          </Link>

          <Link
            href="/reports"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Reports
          </Link>
        </div>
      </section>

      <DashboardStats
        directorates={directorates}
        programmes={programmes.length}
        projects={projects.length}
        activities={activities}
        beneficiaries={beneficiaries}
        indicators={indicators}
      />

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">
            Project Status
          </h2>

          <p className="mb-5 text-sm text-slate-500">
            Current distribution of projects by implementation status
          </p>

          <ProjectStatusChart
            planned={plannedProjects}
            ongoing={ongoingProjects}
            completed={completedProjects}
          />
        </div>

        <QuickActions />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <RecentProjects projects={projects} />

        <RecentActivities activities={recentActivities} />
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          Project Distribution by Programme
        </h2>

        <p className="mb-5 text-sm text-slate-500">
          Number of projects assigned to each programme
        </p>

        <ProgrammeProgressChart
          data={programmeProgressData}
        />
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          Programme Portfolio
        </h2>

        <p className="mb-5 text-sm text-slate-500">
          Overview of registered programmes
        </p>

        <ProgrammeSummary programmes={programmes} />
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          Project Summary
        </h2>

        <div className="space-y-4">
          {projectStatus.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-slate-600" />

                  <span className="font-medium text-slate-700">
                    {item.name}
                  </span>
                </div>

                <span className="text-xl font-bold text-slate-900">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}