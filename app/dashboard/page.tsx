import prisma from "@/lib/prisma";

import ProjectStatusChart from "@/components/dashboard/ProjectStatusChart";
import ProgrammeSummary from "@/components/dashboard/ProgrammeSummary";

import {
  Building2,
  FolderKanban,
  ClipboardList,
  Activity,
  Clock3,
  CheckCircle2,
} from "lucide-react";


export default async function DashboardPage() {


  const [
    directorates,
    programmes,
    projects,
    activities,
    beneficiaries,
    indicators,
    plannedProjects,
    ongoingProjects,
    completedProjects,
    programmeSummary,
    recentActivities,

  ] = await Promise.all([


    prisma.directorate.count(),

    prisma.programme.count(),

    prisma.project.count(),

    prisma.activity.count(),

    prisma.beneficiary.count(),

    prisma.indicator.count(),


    prisma.project.count({
      where:{
        status:"Planned",
      },
    }),


    prisma.project.count({
      where:{
        status:"Ongoing",
      },
    }),


    prisma.project.count({
      where:{
        status:"Completed",
      },
    }),


    prisma.programme.findMany({

      include:{
        projects:true,
        indicators:true,
      },

      orderBy:{
        name:"asc",
      },

    }),


    prisma.activity.findMany({

      take:5,

      orderBy:{
        createdAt:"desc",
      },

      include:{
        project:true,
      },

    }),


  ]);



  const programmeData = programmeSummary.map((programme)=>({

    id: programme.id,

    name: programme.name,

    projects: programme.projects.length,

    indicators: programme.indicators.length,

  }));




  return (

    <div className="space-y-8">


      {/* HEADER */}

      <div className="rounded-xl bg-vsi-navy p-8 text-white shadow-lg">


        <h1 className="text-4xl font-bold text-vsi-yellow">

          VSI-PMIS

        </h1>


        <p className="mt-2 text-xl font-semibold">

          Programme Management Information System

        </p>


        <p className="mt-3 text-blue-100 max-w-3xl">

          Executive overview of organisational programmes,
          projects, activities, beneficiaries and implementation performance.

        </p>


      </div>





      {/* MAIN SUMMARY CARDS */}


      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">


        <DashboardCard

          title="Directorates"

          value={directorates}

          icon={Building2}

          colour="blue"

        />


        <DashboardCard

          title="Programmes"

          value={programmes}

          icon={FolderKanban}

          colour="navy"

        />


        <DashboardCard

          title="Projects"

          value={projects}

          icon={ClipboardList}

          colour="yellow"

        />


        <DashboardCard

          title="Activities"

          value={activities}

          icon={Activity}

          colour="green"

        />


      </div>







      {/* PROJECT STATUS */}


      <div>


        <h2 className="text-2xl font-bold text-gray-900 mb-4">

          Project Implementation Status

        </h2>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


          <DashboardCard

            title="Planned Projects"

            value={plannedProjects}

            icon={Clock3}

            colour="blue"

          />



          <DashboardCard

            title="Ongoing Projects"

            value={ongoingProjects}

            icon={Activity}

            colour="yellow"

          />



          <DashboardCard

            title="Completed Projects"

            value={completedProjects}

            icon={CheckCircle2}

            colour="green"

          />


        </div>


      </div>







      {/* ANALYTICS */}


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        <ProjectStatusChart

          planned={plannedProjects}

          ongoing={ongoingProjects}

          completed={completedProjects}

        />



        <ProgrammeSummary

          programmes={programmeData}

        />


      </div>








      {/* SNAPSHOT + ACTIVITIES */}


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">



        <div className="bg-white rounded-xl shadow p-6">


          <h2 className="text-xl font-bold text-vsi-navy mb-5">

            Organisation Snapshot

          </h2>



          <div className="space-y-5">


            <SummaryRow

              label="Beneficiaries"

              value={beneficiaries}

            />


            <SummaryRow

              label="Indicators Tracked"

              value={indicators}

            />


            <SummaryRow

              label="Active Projects"

              value={ongoingProjects}

            />


          </div>


        </div>






        <div className="bg-white rounded-xl shadow p-6">


          <h2 className="text-xl font-bold text-vsi-navy mb-5">

            Recent Activities

          </h2>




          <div className="space-y-4">


            {recentActivities.length === 0 && (

              <p className="text-gray-500">

                No activities recorded yet.

              </p>

            )}




            {recentActivities.map((activity)=>(


              <div

                key={activity.id}

                className="border-b pb-3"

              >


                <p className="font-semibold text-gray-900">

                  {activity.title}

                </p>


                <p className="text-sm text-gray-600">

                  Project: {activity.project.name}

                </p>


                <p className="text-sm text-gray-500">

                  Status: {activity.status}

                </p>


              </div>


            ))}



          </div>


        </div>



      </div>




    </div>

  );

}







function DashboardCard({

  title,

  value,

  icon: Icon,

  colour="navy",

}:{

  title:string;

  value:number;

  icon:any;

  colour?:string;

}) {



  const styles:Record<string,string>={


    navy:
    "border-vsi-navy bg-blue-50 text-vsi-navy",


    blue:
    "border-vsi-blue bg-blue-50 text-vsi-blue",


    yellow:
    "border-vsi-yellow bg-yellow-50 text-yellow-700",


    green:
    "border-green-600 bg-green-50 text-green-700",

  };




  const dot:Record<string,string>={


    navy:"bg-vsi-navy",

    blue:"bg-vsi-blue",

    yellow:"bg-yellow-500",

    green:"bg-green-600",

  };




  return (


    <div className="bg-white rounded-xl shadow p-6 border-t-4 border-transparent hover:shadow-lg transition">


      <div className="flex justify-between items-center">


        <div>


          <p className="text-sm font-medium text-gray-600">

            {title}

          </p>


          <p className="text-4xl font-bold mt-3 text-vsi-navy">

            {value}

          </p>


        </div>



        <div

          className={`rounded-full p-3 border ${styles[colour]}`}

        >

          <Icon size={28}/>


        </div>



      </div>



      <div className="mt-4 flex items-center gap-2">


        <span

          className={`h-2 w-2 rounded-full ${dot[colour]}`}

        />


        <span className="text-sm text-gray-500">

          Live system record

        </span>


      </div>



    </div>


  );

}








function SummaryRow({

  label,

  value,

}:{

  label:string;

  value:number;

}){


  return (

    <div className="flex justify-between items-center">


      <span className="text-gray-600">

        {label}

      </span>


      <span className="font-bold text-vsi-navy text-xl">

        {value}

      </span>


    </div>

  );

}