import prisma from "@/lib/prisma";
import ActivitiesTable from "./components/ActivitiesTable";
import ActivityStats from "./components/ActivityStats";


export default async function ActivitiesPage() {


  const activities = await prisma.activity.findMany({

    include: {
      project: {
        include: {
          programme: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

  });


  const totalActivities = activities.length;


  const ongoingActivities = activities.filter(
    (activity) =>
      activity.status === "Ongoing"
  ).length;


  const plannedActivities = activities.filter(
    (activity) =>
      activity.status === "Planned"
  ).length;


  const completedActivities = activities.filter(
    (activity) =>
      activity.status === "Completed"
  ).length;



  return (

    <div className="p-8 space-y-8">


      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Activities Management
        </h1>


        <a
          href="/activities/new"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          New Activity
        </a>

      </div>



      <ActivityStats
        total={totalActivities}
        ongoing={ongoingActivities}
        planned={plannedActivities}
        completed={completedActivities}
      />



      <ActivitiesTable
        activities={activities}
      />


    </div>

  );

}