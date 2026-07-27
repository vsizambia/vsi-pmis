import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";


export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;


  const programme = await prisma.programme.findUnique({

    where: {
      id,
    },

    include: {

      directorate: true,

      projects: {

        include: {

          activities: true,

          beneficiaries: true,

        },

        orderBy: {
          name: "asc",
        },

      },


      indicators: true,

    },

  });



  if (!programme) {
    notFound();
  }




  const beneficiaries = programme.projects.flatMap(
    (project) => project.beneficiaries
  );



  const female =
    beneficiaries
      .filter((b) => b.gender === "Female")
      .reduce((sum, b) => sum + b.number, 0);


  const male =
    beneficiaries
      .filter((b) => b.gender === "Male")
      .reduce((sum, b) => sum + b.number, 0);


  const other =
    beneficiaries
      .filter((b) => b.gender === "Other")
      .reduce((sum, b) => sum + b.number, 0);



  const totalBeneficiaries =
    female + male + other;



  const budget =
    programme.projects.reduce(
      (sum, project) => sum + (project.budget ?? 0),
      0
    );




  return (

    <div className="space-y-8">


      {/* Header */}

      <div className="rounded-xl bg-vsi-navy p-8 text-white shadow">

        <p className="text-sm text-blue-200">
          Directorate: {programme.directorate.name}
        </p>


        <h1 className="mt-3 text-4xl font-bold text-vsi-yellow">

          {programme.name}

        </h1>


        <p className="mt-3 max-w-3xl text-blue-100">

          {programme.description}

        </p>


      </div>






      {/* Summary */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">


        <SummaryCard
          title="Projects"
          value={programme.projects.length}
        />


        <SummaryCard
          title="Activities"
          value={
            programme.projects.reduce(
              (sum,p)=>sum+p.activities.length,
              0
            )
          }
        />


        <SummaryCard
          title="Indicators"
          value={programme.indicators.length}
        />


        <SummaryCard
          title="Beneficiaries"
          value={totalBeneficiaries}
        />


        <SummaryCard
          title="Budget (ZMW)"
          value={budget.toLocaleString()}
        />


      </div>








      {/* Gender */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        <div className="bg-white rounded-xl shadow p-6">


          <h2 className="text-xl font-bold text-vsi-navy mb-5">
            Gender Distribution
          </h2>


          <GenderRow
            label="Female"
            value={female}
          />


          <GenderRow
            label="Male"
            value={male}
          />


          <GenderRow
            label="Other"
            value={other}
          />


        </div>




        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold text-vsi-navy mb-5">
            Age Groups
          </h2>


          {beneficiaries.length === 0 ? (

            <p className="text-gray-500">
              No beneficiary data recorded.
            </p>

          ) : (

            <p className="text-gray-700">
              Age disaggregation will appear as beneficiary records are added.
            </p>

          )}


        </div>


      </div>









      {/* Projects */}

      <div className="bg-white rounded-xl shadow p-6">


        <h2 className="text-2xl font-bold text-vsi-navy mb-6">
          Projects
        </h2>



        <div className="space-y-5">


        {programme.projects.map((project)=>(


          <div
            key={project.id}
            className="border rounded-xl p-5"
          >


            <div className="flex justify-between items-start">


              <div>

                <h3 className="text-lg font-bold text-gray-900">

                  {project.name}

                </h3>


                <p className="text-gray-600 mt-1">

                  {project.description}

                </p>

              </div>



              <StatusBadge status={project.status}/>


            </div>





            <div className="grid grid-cols-3 gap-4 mt-5 text-sm">


              <div>

                <p className="text-gray-500">
                  Activities
                </p>

                <p className="font-bold text-xl">
                  {project.activities.length}
                </p>

              </div>


              <div>

                <p className="text-gray-500">
                  Beneficiaries
                </p>

                <p className="font-bold text-xl">
                  {
                    project.beneficiaries.reduce(
                      (sum,b)=>sum+b.number,
                      0
                    )
                  }
                </p>

              </div>


              <div>

                <p className="text-gray-500">
                  Budget
                </p>

                <p className="font-bold text-xl">
                  {project.budget?.toLocaleString() ?? 0}
                </p>

              </div>


            </div>


          </div>


        ))}


        </div>


      </div>









      {/* Indicators */}

      <div className="bg-white rounded-xl shadow p-6">


        <h2 className="text-2xl font-bold text-vsi-navy mb-6">
          Monitoring Indicators
        </h2>



        <div className="space-y-4">


        {programme.indicators.length === 0 && (

          <p className="text-gray-500">
            No indicators registered.
          </p>

        )}



        {programme.indicators.map((indicator)=>(


          <div
            key={indicator.id}
            className="border rounded-lg p-4"
          >


            <h3 className="font-bold">
              {indicator.name}
            </h3>


            <div className="grid grid-cols-3 mt-3 text-sm">


              <span>
                Baseline:
                <b> {indicator.baseline ?? 0}</b>
              </span>


              <span>
                Target:
                <b> {indicator.target ?? 0}</b>
              </span>


              <span>
                Achieved:
                <b> {indicator.achieved ?? 0}</b>
              </span>


            </div>


          </div>


        ))}


        </div>


      </div>


    </div>

  );

}








function SummaryCard({
 title,
 value,
}:{
 title:string;
 value:number|string;
}){

return (

<div className="bg-white rounded-xl shadow p-5 border-t-4 border-vsi-yellow">

<p className="text-gray-500">
{title}
</p>

<p className="text-3xl font-bold text-vsi-navy mt-2">
{value}
</p>

</div>

);

}







function GenderRow({
label,
value,
}:{
label:string;
value:number;
}){

return (

<div className="flex justify-between py-3 border-b">

<span>
{label}
</span>

<span className="font-bold text-vsi-navy">
{value}
</span>

</div>

);

}







function StatusBadge({
status,
}:{
status:string;
}){


const colour =
status==="Completed"
?"bg-green-100 text-green-700"
:
status==="Ongoing" || status==="Active"
?"bg-yellow-100 text-yellow-700"
:
"bg-blue-100 text-blue-700";



return (

<span className={`px-3 py-1 rounded-full text-sm font-semibold ${colour}`}>

{status}

</span>

);

}