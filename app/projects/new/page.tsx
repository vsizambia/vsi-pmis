import Link from "next/link";
import prisma from "@/lib/prisma";
import ProjectForm from "./ProjectForm";

export default async function NewProjectPage() {
  const programmes = await prisma.programme.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">
        Create New Project
      </h1>

      <ProjectForm programmes={programmes} />

      <Link
        href="/projects"
        className="block mt-6 text-blue-600"
      >
        ← Back to Projects
      </Link>
    </main>
  );
}