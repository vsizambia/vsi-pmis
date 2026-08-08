import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProjectForm from "../../new/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [project, programmes, users] = await Promise.all([
    prisma.project.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        referenceNo: true,
        code: true,
        name: true,
        description: true,
        programmeId: true,
        status: true,
        priority: true,
        riskLevel: true,
        progress: true,
        budget: true,
        fundingSource: true,
        donor: true,
        projectManagerId: true,
        startDate: true,
        endDate: true,
      },
    }),

    prisma.programme.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
      },
    }),

    prisma.user.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    }),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <p className="text-sm font-medium text-green-700">
          VSI-PMIS / Projects / Edit
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Edit Project
        </h1>

        <p className="mt-2 text-gray-600">
          Update the official master data for{" "}
          <span className="font-medium">
            {project.name}
          </span>
          .
        </p>
      </div>

      <ProjectForm
        programmes={programmes}
        users={users}
        project={{
          ...project,
          startDate: project.startDate?.toISOString() ?? null,
          endDate: project.endDate?.toISOString() ?? null,
        }}
      />

      <Link
        href={`/projects/${project.id}`}
        className="mt-6 inline-block text-blue-600 hover:underline"
      >
        ← Back to Project
      </Link>
    </main>
  );
}
