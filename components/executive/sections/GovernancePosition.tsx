import type { ExecutiveIntelligence } from "@/lib/intelligence/executive-intelligence.service";

interface Props {
  data: ExecutiveIntelligence;
}

export default function GovernancePosition({ data }: Props) {
  const governance = data.governance;

  return (
    <div className="rounded-xl border border-[#003566] bg-[#001d3d] p-6">
      <h2 className="text-lg font-semibold text-[#ffc300]">
        Governance Position
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-4">

        <div>
          <p className="text-sm text-gray-400">
            Compliance Rate
          </p>
          <p className="text-3xl font-bold text-white">
            {governance.complianceRate}%
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Governance Score
          </p>
          <p className="text-3xl font-bold text-[#ffc300]">
            {governance.governanceScore}%
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            High Risks
          </p>
          <p className="text-3xl font-bold text-red-400">
            {governance.highRisks}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Medium Risks
          </p>
          <p className="text-2xl font-semibold text-white">
            {governance.mediumRisks}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Policies Due
          </p>
          <p className="text-2xl font-semibold text-white">
            {governance.policiesDue}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Pending Audits
          </p>
          <p className="text-2xl font-semibold text-white">
            {governance.pendingAudits}
          </p>
        </div>

      </div>
    </div>
  );
}