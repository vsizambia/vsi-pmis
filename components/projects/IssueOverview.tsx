type Issue = {
  id: string;
  title: string;
  priority: string;
  status: string;
  resolution: string | null;
};

export default function IssueOverview({
  issues,
}: {
  issues: Issue[];
}) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">
        Issue Register
      </h2>

      <div className="mt-4 space-y-3">
        {issues.length === 0 ? (
          <p className="text-gray-500">
            No issues registered.
          </p>
        ) : (
          issues.map((issue) => (
            <div
              key={issue.id}
              className="rounded-lg border p-4"
            >
              <div className="flex justify-between">
                <p className="font-semibold">
                  {issue.title}
                </p>

                <span className="text-sm text-gray-500">
                  {issue.status}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                <p>
                  Priority: {issue.priority}
                </p>

                <p>
                  Resolution:{" "}
                  {issue.resolution ?? "Pending"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}