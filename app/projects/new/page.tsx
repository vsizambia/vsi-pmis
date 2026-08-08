import Link from "next/link";
import prisma from "@/lib/prisma";
import ProjectForm from "./ProjectForm";

export default async function NewProjectPage() {
  const [programmes, users] = await Promise.all([
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

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <p className="text-sm font-medium text-green-700">
          VSI-PMIS / Projects
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Register New Project
        </h1>

        <p className="mt-2 text-gray-600">
          Capture the official master data for a VSI project.
        </p>
      </div>

      <ProjectForm
        programmes={programmes}
        users={users}
      />

      <Link
        href="/projects"
        className="mt-6 inline-block text-blue-600 hover:underline"
      >
        ← Back to Projects
      </Link>
    </main>
  );
}
