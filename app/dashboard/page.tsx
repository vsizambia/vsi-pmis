import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const directorates = await prisma.directorate.count();

  const programmes = await prisma.programme.count();

  const projects = await prisma.project.count();

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900">
        VSI Programme Management Information System
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to the Programme Management Information System.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-gray-700">
            Directorates
          </h2>
          <p className="text-4xl font-bold mt-3">
            {directorates}
          </p>
        </div>


        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-gray-700">
            Programmes
          </h2>
          <p className="text-4xl font-bold mt-3">
            {programmes}
          </p>
        </div>


        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-gray-700">
            Projects
          </h2>
          <p className="text-4xl font-bold mt-3">
            {projects}
          </p>
        </div>

      </div>
    </div>
  );
}