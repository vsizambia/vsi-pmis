import prisma from "@/lib/prisma";
import Link from "next/link";


export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {


  const { id } = await params;


  const project = await prisma.project.findUnique({

    where: {
      id,
    },

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

    <div className="p-8 space-y-6">



      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-[#001d3d]">
            Project Details
          </h1>


          <p className="text-gray-600 mt-2">
            Project implementation profile
          </p>


        </div>




        <div className="flex gap-3">


          <Link

            href="/projects"

            className="border border-[#003566] text-[#003566] px-5 py-3 rounded-lg hover:bg-gray-100"

          >

            Back to Projects

          </Link>




          <Link

            href={`/projects/${project.id}/edit`}

            className="bg-[#003566] text-white px-5 py-3 rounded-lg hover:bg-[#001d3d]"

          >

            Edit Project

          </Link>


        </div>


      </div>





      {/* Project Information */}


      <div className="bg-white rounded-lg shadow p-6 space-y-5">


        <h2 className="text-2xl font-semibold text-[#003566]">

          {project.name}

        </h2>




        <p>

          <strong>Description:</strong>

          <br />

          {project.description || "No description provided"}

        </p>





        <p>

          <strong>Programme:</strong>{" "}

          {project.programme.name}

        </p>





        <p>

          <strong>Status:</strong>{" "}



          <span

            className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${
                project.status === "Ongoing"
                  ? "bg-green-100 text-green-700"
                  : project.status === "Completed"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            `}

          >

            {project.status}

          </span>


        </p>





        <p>

          <strong>Budget:</strong>{" "}

          {project.budget
            ? `K ${project.budget.toLocaleString()}`
            : "Not allocated"}

        </p>





        <div className="grid md:grid-cols-2 gap-4">


          <p>

            <strong>Start Date:</strong>{" "}

            {project.startDate
              ? project.startDate.toDateString()
              : "Not set"}

          </p>





          <p>

            <strong>End Date:</strong>{" "}

            {project.endDate
              ? project.endDate.toDateString()
              : "Not set"}

          </p>


        </div>



      </div>







      {/* Implementation Activities */}


      <div className="bg-white rounded-lg shadow p-6">



        <div className="flex justify-between items-center mb-5">


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

            className="bg-[#ffc300] text-[#000814] px-4 py-2 rounded-lg font-medium hover:bg-[#ffd60a]"

          >

            Add Activity

          </Link>



        </div>







        <div className="space-y-3">





          {project.activities.length === 0 && (

            <p className="text-gray-500">

              No activities registered for this project.

            </p>

          )}







          {project.activities.map((activity) => (


            <Link

              key={activity.id}

              href={`/activities/${activity.id}`}

              className="block border rounded-lg p-4 hover:bg-gray-50"

            >



              <div className="flex justify-between items-center">



                <div>


                  <h3 className="font-semibold text-[#001d3d]">

                    {activity.title}

                  </h3>



                  <p className="text-sm text-gray-600">

                    {activity.description || "No description"}

                  </p>



                </div>





                <span

                  className="
                    px-3 py-1 rounded-full 
                    bg-blue-100 text-blue-700 text-sm
                  "

                >

                  {activity.status}

                </span>



              </div>



            </Link>


          ))}




        </div>



      </div>




    </div>

  );

}