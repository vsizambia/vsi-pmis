import type { ExecutiveIntelligence } from "@/lib/intelligence/executive-intelligence.service";

interface Props {
  data: ExecutiveIntelligence;
}

export default function ExecutiveActions({ data }: Props) {

  const risk = data.risk;

  return (
    <div className="rounded-xl border border-[#003566] bg-[#001d3d] p-6">

      <h2 className="text-lg font-semibold text-[#ffc300]">
        Executive Actions
      </h2>


      <ul className="mt-4 space-y-3 text-sm text-white">

        {risk.highRiskProjects > 0 && (
          <li>
            • Review {risk.highRiskProjects} high-risk project(s)
            requiring management attention.
          </li>
        )}


        {risk.mediumRiskProjects > 0 && (
          <li>
            • Monitor {risk.mediumRiskProjects} medium-risk project(s).
          </li>
        )}


        {risk.highRiskProjects === 0 &&
          risk.mediumRiskProjects === 0 && (
            <li>
              • Portfolio risk position is stable.
            </li>
          )}

      </ul>

    </div>
  );
}