type Risk = {
  id: string;
  title: string;
  probability: string;
  impact: string;
  status: string;
};

export default function RiskOverview({
  risks,
}: {
  risks: Risk[];
}) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">
        Risk Register
      </h2>

      <div className="mt-4 space-y-3">
        {risks.length === 0 ? (
          <p className="text-gray-500">
            No risks registered.
          </p>
        ) : (
          risks.map((risk) => (
            <div
              key={risk.id}
              className="rounded-lg border p-4"
            >
              <p className="font-semibold">
                {risk.title}
              </p>

              <div className="mt-2 text-sm text-gray-600">
                <p>
                  Probability: {risk.probability}
                </p>

                <p>
                  Impact: {risk.impact}
                </p>

                <p>
                  Status: {risk.status}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}