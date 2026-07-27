import Link from "next/link";


export default function ProjectsTable({
  projects,
}: {
  projects: any[];
}) {

  return (

    <div className="bg-white rounded-lg shadow overflow-hidden">


      <table className="w-full">


        <thead className="bg-[#001d3d] text-white">

          <tr>

            <th className="text-left p-4">
              Project
            </th>


            <th className="text-left p-4">
              Programme
            </th>


            <th className="text-left p-4">
              Status
            </th>


            <th className="text-left p-4">
              Activities
            </th>


            <th className="text-left p-4">
              Action
            </th>


          </tr>

        </thead>



        <tbody>


          {projects.map((project) => (

            <tr
              key={project.id}
              className="border-b hover:bg-gray-50"
            >


              <td className="p-4">

                <Link
                  href={`/projects/${project.id}`}
                  className="font-semibold text-[#003566] hover:text-[#001d3d]"
                >
                  {project.name}
                </Link>


                <p className="text-sm text-gray-500 mt-1">
                  {project.description || "No description"}
                </p>

              </td>




              <td className="p-4">

                {project.programme.name}

              </td>





              <td className="p-4">


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


              </td>





              <td className="p-4 text-center">

                {project.activities.length}

              </td>





              <td className="p-4">

                <Link
                  href={`/projects/${project.id}`}
                  className="text-[#003566] font-medium hover:underline"
                >
                  View
                </Link>

              </td>



            </tr>


          ))}



          {projects.length === 0 && (

            <tr>

              <td
                colSpan={5}
                className="p-8 text-center text-gray-500"
              >
                No projects registered yet.
              </td>

            </tr>

          )}


        </tbody>


      </table>


    </div>

  );

}