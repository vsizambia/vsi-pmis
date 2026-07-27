import prisma from "@/lib/prisma";
import Link from "next/link";


export default async function ActivityDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } = await params;


  const activity = await prisma.activity.findUnique({
    where: {
      id,
    },
    include: {
      project: {
        include: {
          programme: true,
        },
      },
    },
  });


  if (!activity) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">
          Activity Not Found
        </h1>
      </div>
    );
  }


  return (
    <div className="p-8 space-y-6">


      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Activity Details
        </h1>


        <Link
          href={`/activities/${activity.id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Activity
        </Link>

      </div>



      <div className="bg-white shadow rounded p-6 space-y-4">


        <h2 className="text-2xl font-semibold">
          {activity.title}
        </h2>


        <p>
          <strong>Description:</strong>
          <br />
          {activity.description || "No description provided"}
        </p>


        <p>
          <strong>Status:</strong>{" "}
          {activity.status}
        </p>


        <p>
          <strong>Project:</strong>{" "}
          {activity.project.name}
        </p>


        <p>
          <strong>Programme:</strong>{" "}
          {activity.project.programme.name}
        </p>


        <p>
          <strong>Start Date:</strong>{" "}
          {activity.startDate
            ? activity.startDate.toDateString()
            : "Not set"}
        </p>


        <p>
          <strong>End Date:</strong>{" "}
          {activity.endDate
            ? activity.endDate.toDateString()
            : "Not set"}
        </p>


      </div>


    </div>
  );
}