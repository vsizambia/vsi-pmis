import prisma from "@/lib/prisma";
import ProjectsTable from "./components/ProjectsTable";

export default async function ProjectsPage() {

  const projects = await prisma.project.findMany({
    include: {
      programme: true,
      activities: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });


  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-6">


        <div>

          <h1 className="text-3xl font-bold text-[#001d3d]">
            Project Portfolio
          </h1>


          <p className="text-gray-600 mt-2">
            Manage projects implemented under VSI programmes
          </p>

        </div>



        <a
          href="/projects/new"
          className="bg-[#003566] text-white px-5 py-3 rounded-lg hover:bg-[#001d3d]"
        >
          New Project
        </a>


      </div>



      <ProjectsTable projects={projects} />


    </div>

  );
}