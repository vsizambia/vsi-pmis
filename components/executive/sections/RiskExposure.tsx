import type { ExecutiveIntelligence } from "@/lib/intelligence/executive-intelligence.service";

interface Props {
  data: ExecutiveIntelligence;
}

export default function RiskExposure({ data }: Props) {
  const risk = data.risk;

  return (
    <div className="rounded-xl border border-[#003566] bg-[#001d3d] p-6">

      <h2 className="text-lg font-semibold text-[#ffc300]">
        Risk Exposure
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-4">

        <div>
          <p className="text-sm text-gray-400">
            Overall Risk Score
          </p>

          <p className="text-3xl font-bold text-white">
            {risk.overallRiskScore}%
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-400">
            Portfolio Risk Level
          </p>

          <p
            className={`text-2xl font-bold ${
              risk.portfolioRisk === "Critical"
                ? "text-red-400"
                : risk.portfolioRisk === "High"
                ? "text-orange-400"
                : risk.portfolioRisk === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {risk.portfolioRisk}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-400">
            High Risk Projects
          </p>

          <p className="text-2xl font-semibold text-red-400">
            {risk.highRiskProjects}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-400">
            Active Risk Items
          </p>

          <p className="text-2xl font-semibold text-white">
            {risk.risks.length}
          </p>
        </div>


      </div>

    </div>
  );
}