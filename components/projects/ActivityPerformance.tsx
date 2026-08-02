import Link from "next/link";

import StatusBadge from "@/components/common/StatusBadge";

type Activity = {
  id: string;
  title: string;
  progress: number;
  status: string;
  description: string | null;
};

export default function ActivityPerformance({
  activities,
}: {
  activities: Activity[];
}) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">
        Activities
      </h2>

      <div className="mt-4 space-y-3">
        {activities.length === 0 ? (
          <p className="text-gray-500">
            No activities registered.
          </p>
        ) : (
          activities.map((activity) => (
            <Link
              key={activity.id}
              href={`/activities/${activity.id}`}
              className="block rounded-lg border p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">
                    {activity.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    Progress: {activity.progress}%
                  </p>
                </div>

                <StatusBadge
                  status={activity.status}
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}