import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      programme: {
        include: {
          directorate: true,
        },
      },
    },
  });

  return (
    <main className="p-8">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            VSI Projects
          </h1>

          <p className="text-gray-600 mt-2">
            Manage all VSI projects.
          </p>
        </div>


        <Link
          href="/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Project
        </Link>

      </div>


      {projects.length === 0 ? (

        <div className="border rounded-lg p-6">
          <p className="text-gray-600">
            No projects available.
          </p>
        </div>

      ) : (

        <div className="grid gap-4">

          {projects.map((project) => (

            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="border rounded-lg p-6 block hover:bg-gray-50 transition"
            >

              <h2 className="text-xl font-semibold mb-2">
                {project.name}
              </h2>


              <p className="text-gray-600 mb-4">
                {project.description}
              </p>


              <div className="grid md:grid-cols-2 gap-3 text-sm">


                <div>
                  <strong>Status:</strong>{" "}
                  {project.status}
                </div>


                <div>
                  <strong>Programme:</strong>{" "}
                  {project.programme.name}
                </div>


                <div>
                  <strong>Directorate:</strong>{" "}
                  {project.programme.directorate.name}
                </div>


                <div>
                  <strong>Budget:</strong>{" "}
                  ZMW{" "}
                  {project.budget?.toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </div>


                <div>
                  <strong>Start Date:</strong>{" "}
                  {project.startDate?.toLocaleDateString()}
                </div>


                <div>
                  <strong>End Date:</strong>{" "}
                  {project.endDate?.toLocaleDateString()}
                </div>


              </div>


            </Link>

          ))}

        </div>

      )}

    </main>
  );
}