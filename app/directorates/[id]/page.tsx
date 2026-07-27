import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";


export default async function DirectorateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;


  const directorate = await prisma.directorate.findUnique({

    where: {
      id,
    },

    include: {

      programmes: {

        include: {

          projects: true,

          indicators: true,

        },

        orderBy: {
          name: "asc",
        },

      },

    },

  });



  if (!directorate) {

    notFound();

  }



  const totalProjects =
    directorate.programmes.reduce(
      (total, programme) =>
        total + programme.projects.length,
      0
    );


  const totalIndicators =
    directorate.programmes.reduce(
      (total, programme) =>
        total + programme.indicators.length,
      0
    );




  return (

    <div className="space-y-8">


      {/* Header */}

      <div className="bg-vsi-navy rounded-xl p-8 text-white shadow-lg">


        <h1 className="text-3xl font-bold text-vsi-yellow">

          {directorate.name}

        </h1>


        <p className="mt-3 text-blue-100 max-w-3xl">

          {directorate.description ||
            "VSI organisational directorate responsible for strategic implementation and management."}

        </p>


      </div>





      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        <StatCard

          title="Programmes"

          value={directorate.programmes.length}

        />


        <StatCard

          title="Projects"

          value={totalProjects}

        />


        <StatCard

          title="Indicators"

          value={totalIndicators}

        />


      </div>






      {/* Programmes */}

      <div>


        <h2 className="text-2xl font-bold text-vsi-navy mb-5">

          Programmes Managed

        </h2>




        {directorate.programmes.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-6 text-gray-500">

            No programmes assigned to this directorate.

          </div>


        ) : (


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


            {directorate.programmes.map((programme) => (


              <Link

                key={programme.id}

                href={`/programmes/${programme.id}`}

                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"

              >


                <h3 className="text-xl font-bold text-gray-900">

                  {programme.name}

                </h3>



                <p className="mt-2 text-gray-600">

                  {programme.description ||

                    "Programme implementation and management."}

                </p>




                <div className="grid grid-cols-2 gap-4 mt-6">


                  <div className="bg-gray-50 rounded-lg p-4">


                    <p className="text-sm text-gray-500">

                      Projects

                    </p>


                    <p className="text-2xl font-bold text-vsi-navy">

                      {programme.projects.length}

                    </p>


                  </div>





                  <div className="bg-gray-50 rounded-lg p-4">


                    <p className="text-sm text-gray-500">

                      Indicators

                    </p>


                    <p className="text-2xl font-bold text-vsi-navy">

                      {programme.indicators.length}

                    </p>


                  </div>


                </div>



              </Link>


            ))}


          </div>


        )}


      </div>


    </div>

  );

}





function StatCard({

  title,

  value,

}: {

  title:string;

  value:number;

}) {


  return (

    <div className="bg-white rounded-xl shadow p-6 border-t-4 border-vsi-yellow">


      <p className="text-gray-600 font-medium">

        {title}

      </p>


      <p className="text-4xl font-bold text-vsi-navy mt-3">

        {value}

      </p>


    </div>

  );

}