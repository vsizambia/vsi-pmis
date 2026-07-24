import Link from "next/link";
import prisma from "@/lib/prisma";
import ActivityForm from "./ActivityForm";

export default async function NewActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
    },
  });


  if (!project) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">
          Project not found
        </h1>

        <Link
          href="/projects"
          className="text-blue-600"
        >
          ← Back to Projects
        </Link>
      </main>
    );
  }


  return (
    <main className="p-8 max-w-3xl">

      <h1 className="text-3xl font-bold mb-2">
        Add Activity
      </h1>


      <p className="text-gray-600 mb-6">
        Project: {project.name}
      </p>


      <ActivityForm projectId={project.id} />


      <Link
        href={`/projects/${project.id}`}
        className="block mt-6 text-blue-600"
      >
        ← Back to Project
      </Link>

    </main>
  );
}