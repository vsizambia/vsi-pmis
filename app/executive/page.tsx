import ExecutiveHeader from "@/components/dashboard/layout/ExecutiveHeader";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";

import { getExecutiveIntelligence } from "@/lib/intelligence/executive-intelligence.service";


function scoreStatus(status: string) {
  switch (status) {
    case "Excellent":
      return "Excellent performance";
    case "Healthy":
      return "Stable and controlled";
    case "Needs Attention":
      return "Management attention required";
    case "At Risk":
      return "Corrective action required";
    default:
      return "Critical intervention required";
  }
}


export default async function ExecutivePage() {

  const intelligence =
    await getExecutiveIntelligence();


  const {
    executiveScore,
    organisationStatus,
    dashboard,
    governance,
    finance,
    risk,
  } = intelligence;


  return (

    <DashboardLayout>

      <ExecutiveHeader
        title="VSI Executive Command Centre"
        subtitle="Strategic performance, governance, finance and risk intelligence"
      />


      <div className="grid gap-6 md:grid-cols-4">


        <div className="rounded-xl border p-6">

          <p className="text-sm text-gray-500">
            Executive Score
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {executiveScore}%
          </h2>

          <p className="mt-2 text-sm">
            {organisationStatus}
          </p>

        </div>



        <div className="rounded-xl border p-6">

          <p className="text-sm text-gray-500">
            Organisation Health
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {dashboard.organisationHealth.overallScore}%
          </h2>

          <p className="mt-2 text-sm">
            {scoreStatus(
              dashboard.organisationHealth.status,
            )}
          </p>

        </div>



        <div className="rounded-xl border p-6">

          <p className="text-sm text-gray-500">
            Governance Compliance
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {governance.complianceRate}%
          </h2>

        </div>



        <div className="rounded-xl border p-6">

          <p className="text-sm text-gray-500">
            Portfolio Risk
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {risk.portfolioRisk}
          </h2>

          <p className="mt-2 text-sm">
            {risk.highRiskProjects} high-risk projects
          </p>

        </div>


      </div>



      <div className="mt-8 grid gap-6 md:grid-cols-3">


        <div className="rounded-xl border p-6">

          <h3 className="font-semibold">
            Financial Intelligence
          </h3>

          <p className="mt-3">
            Budget:
            {" "}
            ZMW {finance.totalBudget.toLocaleString()}
          </p>

          <p>
            Utilisation:
            {" "}
            {finance.utilisationRate}%
          </p>

        </div>



        <div className="rounded-xl border p-6">

          <h3 className="font-semibold">
            Risk Profile
          </h3>

          <p className="mt-3">
            Critical / High:
            {" "}
            {risk.highRiskProjects}
          </p>

          <p>
            Medium:
            {" "}
            {risk.mediumRiskProjects}
          </p>

          <p>
            Low:
            {" "}
            {risk.lowRiskProjects}
          </p>

        </div>



        <div className="rounded-xl border p-6">

          <h3 className="font-semibold">
            Programme Intelligence
          </h3>

          <p className="mt-3">
            Active Programmes:
            {" "}
            {dashboard.portfolio.activeProgrammes}
          </p>

          <p>
            Active Projects:
            {" "}
            {dashboard.portfolio.activeProjects}
          </p>

        </div>


      </div>


    </DashboardLayout>

  );
}