import type { ExecutiveIntelligence } from "@/lib/intelligence/executive-intelligence.service";

interface Props {
  data: ExecutiveIntelligence;
}

export default function ExecutiveScoreCard({ data }: Props) {
  const statusColor =
    data.organisationStatus === "Excellent"
      ? "text-green-400"
      : data.organisationStatus === "Healthy"
      ? "text-blue-400"
      : data.organisationStatus === "Needs Attention"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="rounded-xl bg-[#001d3d] p-6 border border-[#003566]">
      <p className="text-sm text-gray-400">
        Executive Intelligence Score
      </p>

      <div className="mt-3 flex items-end justify-between">
        <h2 className="text-5xl font-bold text-[#ffc300]">
          {data.executiveScore}%
        </h2>

        <span className={`font-semibold ${statusColor}`}>
          {data.organisationStatus}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-300">
        Combined assessment of organisational performance,
        governance, financial position and risk exposure.
      </p>
    </div>
  );
}