import { getDashboardData } from "@/lib/dashboard/dashboard.service";
import { getGovernanceDashboard } from "@/lib/governance/dashboard.service";
import { getFinanceIntelligence } from "@/lib/finance/finance-intelligence.service";
import { getRiskIntelligence } from "@/lib/risk/risk-intelligence.service";


export interface ExecutiveIntelligence {
  dashboard: Awaited<ReturnType<typeof getDashboardData>>;

  governance: Awaited<
    ReturnType<typeof getGovernanceDashboard>
  >;

  finance: Awaited<
    ReturnType<typeof getFinanceIntelligence>
  >;

  risk: Awaited<
    ReturnType<typeof getRiskIntelligence>
  >;


  executiveScore: number;


  organisationStatus:
    | "Excellent"
    | "Healthy"
    | "Needs Attention"
    | "At Risk"
    | "Critical";
}


function classify(
  score: number,
): ExecutiveIntelligence["organisationStatus"] {

  if (score >= 85) return "Excellent";

  if (score >= 70) return "Healthy";

  if (score >= 50) return "Needs Attention";

  if (score >= 30) return "At Risk";

  return "Critical";
}


export async function getExecutiveIntelligence(): Promise<ExecutiveIntelligence> {

  const [
    dashboard,
    governance,
    finance,
    risk,
  ] = await Promise.all([

    getDashboardData(),

    getGovernanceDashboard(),

    getFinanceIntelligence(),

    getRiskIntelligence(),

  ]);


  const governanceScore =
    governance.complianceRate ?? 0;


  const financeScore =
    finance.utilisationRate ?? 0;


  const organisationScore =
    dashboard.organisationHealth.overallScore;


  const riskScore =
    100 - risk.overallRiskScore;


  const executiveScore =
    Math.round(
      organisationScore * 0.50 +
      governanceScore * 0.20 +
      financeScore * 0.15 +
      riskScore * 0.15,
    );


  return {

    dashboard,

    governance,

    finance,

    risk,

    executiveScore,

    organisationStatus:
      classify(executiveScore),

  };
}