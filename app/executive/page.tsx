import ExecutiveHeader from "@/components/dashboard/layout/ExecutiveHeader";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";

import ExecutiveScoreCard from "@/components/executive/cards/ExecutiveScoreCard";
import GovernancePosition from "@/components/executive/sections/GovernancePosition";
import FinancialPosition from "@/components/executive/sections/FinancialPosition";
import RiskExposure from "@/components/executive/sections/RiskExposure";
import ProgrammePerformance from "@/components/executive/sections/ProgrammePerformance";
import ExecutiveActions from "@/components/executive/sections/ExecutiveActions";

import { getExecutiveIntelligence } from "@/lib/intelligence/executive-intelligence.service";


export default async function ExecutivePage() {

  const executive =
    await getExecutiveIntelligence();


  return (
    <DashboardLayout>

      <ExecutiveHeader
        title="VSI Executive Command Centre"
        subtitle="Strategic performance, governance, finance and risk intelligence"
      />


      <div className="mt-6 space-y-6">


        <ExecutiveScoreCard
          data={executive}
        />


        <div className="grid gap-6 md:grid-cols-2">

          <GovernancePosition
            data={executive}
          />


          <FinancialPosition
            data={executive}
          />


          <RiskExposure
            data={executive}
          />


          <ProgrammePerformance
            data={executive}
          />

        </div>


        <ExecutiveActions
          data={executive}
        />


      </div>


    </DashboardLayout>
  );
}