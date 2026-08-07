import type { ExecutiveIntelligence } from "@/lib/intelligence/executive-intelligence.service";

interface Props {
  data: ExecutiveIntelligence;
}

export default function FinancialPosition({ data }: Props) {
  const finance = data.finance;

  return (
    <div className="rounded-xl border border-[#003566] bg-[#001d3d] p-6">

      <h2 className="text-lg font-semibold text-[#ffc300]">
        Financial Position
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-4">

        <div>
          <p className="text-sm text-gray-400">
            Total Budget
          </p>
          <p className="text-2xl font-bold text-white">
            ZMW {finance.totalBudget.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Expenditure
          </p>
          <p className="text-2xl font-bold text-white">
            ZMW {finance.totalSpent.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Remaining Budget
          </p>
          <p className="text-2xl font-semibold text-green-400">
            ZMW {finance.remainingBudget.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Utilisation Rate
          </p>
          <p className="text-3xl font-bold text-[#ffc300]">
            {finance.utilisationRate}%
          </p>
        </div>

      </div>

    </div>
  );
}