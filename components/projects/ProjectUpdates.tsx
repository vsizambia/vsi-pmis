import { formatDate } from "@/lib/format";

type Update = {
  id: string;
  reportDate: Date;
  progress: number;
  achievements: string | null;
  challenges: string | null;
  nextSteps: string | null;
};

export default function ProjectUpdates({
  updates,
}: {
  updates: Update[];
}) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">
        Progress Updates
      </h2>

      <div className="mt-4 space-y-3">
        {updates.length === 0 ? (
          <p className="text-gray-500">
            No progress updates submitted.
          </p>
        ) : (
          updates.map((update) => (
            <div
              key={update.id}
              className="rounded-lg border p-4"
            >
              <div className="flex justify-between">
                <p className="font-semibold">
                  {formatDate(update.reportDate)}
                </p>

                <span>
                  {update.progress}%
                </span>
              </div>

              <p className="mt-2 text-sm">
                {update.achievements ??
                  "No achievements recorded"}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Challenges:{" "}
                {update.challenges ?? "-"}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Next Steps:{" "}
                {update.nextSteps ?? "-"}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}