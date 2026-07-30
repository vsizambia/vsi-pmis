import { Activity } from "lucide-react";

type RecentActivity = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  project?: {
    name: string;
  } | null;
};

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

export default function RecentActivities({
  activities,
}: RecentActivitiesProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Recent Activities
        </h2>

        <p className="text-sm text-slate-500">
          Latest implementation activities recorded in the PMIS
        </p>
      </div>


      {activities.length === 0 ? (

        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-slate-600">
            No activities recorded yet.
          </p>
        </div>

      ) : (

        <div className="space-y-4">

          {activities.map((activity) => (

            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-lg bg-slate-50 p-4"
            >

              <div className="rounded-full bg-emerald-100 p-2">
                <Activity className="h-5 w-5 text-emerald-700" />
              </div>


              <div className="flex-1">

                <h3 className="font-semibold text-slate-900">
                  {activity.name}
                </h3>


                <p className="text-sm text-slate-600">
                  {activity.project?.name ?? "No project assigned"}
                </p>


                {activity.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {activity.description}
                  </p>
                )}


                <p className="mt-2 text-xs text-slate-400">
                  {activity.createdAt.toLocaleDateString()}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}
