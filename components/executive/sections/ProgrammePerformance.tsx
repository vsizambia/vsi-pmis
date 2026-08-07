import type { ExecutiveIntelligence } from "@/lib/intelligence/executive-intelligence.service";

interface Props {
  data: ExecutiveIntelligence;
}

export default function ProgrammePerformance({ data }: Props) {

  const portfolio = data.dashboard.portfolio;

  return (
    <div className="rounded-xl border border-[#003566] bg-[#001d3d] p-6">

      <h2 className="text-lg font-semibold text-[#ffc300]">
        Programme Performance
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-4">

        <div>
          <p className="text-sm text-gray-400">
            Active Programmes
          </p>

          <p className="text-3xl font-bold text-white">
            {portfolio.activeProgrammes}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-400">
            Active Projects
          </p>

          <p className="text-3xl font-bold text-white">
            {portfolio.activeProjects}
          </p>
        </div>

      </div>

    </div>
  );
}