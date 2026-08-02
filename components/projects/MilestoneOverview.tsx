import { formatDate } from "@/lib/format";

type Milestone = {
  id: string;
  name: string;
  status: string;
  dueDate: Date;
  progress: number;
};

export default function MilestoneOverview({
  milestones,
}: {
  milestones: Milestone[];
}) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">
        Milestones
      </h2>

      <div className="mt-4 space-y-3">
        {milestones.length === 0 ? (
          <p className="text-gray-500">
            No milestones registered.
          </p>
        ) : (
          milestones.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border p-4"
            >
              <div className="flex justify-between">
                <p className="font-semibold">
                  {item.name}
                </p>

                <span className="text-sm text-gray-500">
                  {item.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Due: {formatDate(item.dueDate)}
              </p>

              <p className="mt-2 text-sm">
                Progress: {item.progress}%
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}