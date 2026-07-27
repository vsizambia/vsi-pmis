import Link from "next/link";

type Activity = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  project: {
    name: string;
    programme: {
      name: string;
    };
  };
};

export default function ActivitiesTable({
  activities,
}: {
  activities: Activity[];
}) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">

      <table className="min-w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">
              Activity
            </th>

            <th className="p-3 text-left">
              Project
            </th>

            <th className="p-3 text-left">
              Programme
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Actions
            </th>
          </tr>
        </thead>


        <tbody>

          {activities.map((activity) => (

            <tr
              key={activity.id}
              className="border-t"
            >

              <td className="p-3">
                <div className="font-semibold">
                  {activity.title}
                </div>

                <div className="text-sm text-gray-500">
                  {activity.description}
                </div>
              </td>


              <td className="p-3">
                {activity.project.name}
              </td>


              <td className="p-3">
                {activity.project.programme.name}
              </td>


              <td className="p-3">

                <span
                  className={`px-3 py-1 rounded text-sm ${
                    activity.status === "Ongoing"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {activity.status}
                </span>

              </td>


              <td className="p-3 space-x-2">

                <Link
                  href={`/activities/${activity.id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  View
                </Link>


                <Link
                  href={`/activities/${activity.id}/edit`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}