import prisma from "@/lib/prisma";
import Link from "next/link";


export default async function DirectoratesPage() {


  const directorates = await prisma.directorate.findMany({

    include: {

      programmes: {

        include: {

          projects: true,
          indicators: true,

        },

      },

    },

    orderBy: {

      name: "asc",

    },

  });



  return (

    <div className="space-y-8">


      {/* Header */}

      <div className="flex justify-between items-center">


        <div>

          <h1 className="text-3xl font-bold text-vsi-navy">

            Directorates

          </h1>


          <p className="mt-2 text-gray-600">

            VSI Secretariat organisational structure and programme portfolio.

          </p>


        </div>




        <Link

          href="/directorates/new"

          className="
          bg-vsi-yellow
          text-vsi-navy
          px-5
          py-3
          rounded-lg
          font-semibold
          shadow
          hover:bg-vsi-gold
          "

        >

          + New Directorate

        </Link>


      </div>





      {/* Directorates */}


      <div className="space-y-6">


        {directorates.map((directorate) => (



          <div

            key={directorate.id}

            className="
            bg-white
            rounded-xl
            shadow
            border-l-8
            border-vsi-navy
            p-6
            "

          >



            {/* Directorate Header */}


            <div className="flex justify-between">


              <div>


                <Link

                  href={`/directorates/${directorate.id}`}

                  className="
                  text-2xl
                  font-bold
                  text-vsi-navy
                  hover:text-vsi-blue
                  "

                >

                  {directorate.name}

                </Link>



                <p className="mt-2 text-gray-600">

                  {directorate.description ||
                    "No description provided."}

                </p>


              </div>




              <div className="text-right">


                <p className="text-sm text-gray-500">

                  Programmes

                </p>


                <p className="
                text-3xl
                font-bold
                text-vsi-yellow
                ">

                  {directorate.programmes.length}

                </p>


              </div>


            </div>






            {/* Programmes under Directorate */}


            <div className="mt-6">


              <h3 className="
              font-semibold
              text-vsi-navy
              mb-3
              ">

                Programmes Managed

              </h3>




              {directorate.programmes.length === 0 && (


                <p className="text-gray-500 italic">

                  No programmes assigned.

                </p>


              )}






              <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
              ">



                {directorate.programmes.map((programme) => (



                  <div

                    key={programme.id}

                    className="
                    border
                    rounded-lg
                    p-4
                    bg-gray-50
                    "

                  >



                    <h4 className="
                    font-bold
                    text-gray-900
                    ">

                      {programme.name}

                    </h4>



                    <p className="text-sm text-gray-600 mt-1">

                      {programme.description ||
                        "No description."}

                    </p>




                    <div className="
                    flex
                    gap-6
                    mt-4
                    text-sm
                    ">



                      <span>

                        Projects:

                        <strong className="ml-1 text-vsi-navy">

                          {programme.projects.length}

                        </strong>


                      </span>





                      <span>

                        Indicators:

                        <strong className="ml-1 text-vsi-navy">

                          {programme.indicators.length}

                        </strong>


                      </span>



                    </div>



                  </div>



                ))}


              </div>



            </div>




          </div>



        ))}



      </div>



    </div>


  );

}