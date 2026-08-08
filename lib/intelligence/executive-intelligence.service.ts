import { getDashboardData } from "@/lib/dashboard/dashboard.service";
import { getGovernanceDashboard } from "@/lib/governance/dashboard.service";
import { getFinanceIntelligence } from "@/lib/finance/finance-intelligence.service";
import { getRiskIntelligence } from "@/lib/risk/risk-intelligence.service";

export interface ExecutiveIntelligence {
  dashboard: Awaited<ReturnType<typeof getDashboardData>>;
  governance: Awaited<ReturnType<typeof getGovernanceDashboard>>;
  finance: Awaited<ReturnType<typeof getFinanceIntelligence>>;
  risk: Awaited<ReturnType<typeof getRiskIntelligence>>;

  executiveScore: number;

  scoreBreakdown: {
    programmePerformance: number;
    projectImplementation: number;
    activityDelivery: number;
    indicatorPerformance: number;
    governance: number;
    finance: number;
    risk: number;
  };

  organisationStatus:
    | "Excellent"
    | "Healthy"
    | "Needs Attention"
    | "At Risk"
    | "Critical";

  executivePriorities: string[];
}

function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
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

function calculateFinanceHealth(
  utilisationRate: number,
  totalBudget: number,
  totalSpent: number,
): number {
  /*
   * Financial utilisation is not the same as financial health.
   *
   * Zero expenditure may mean that expenditure has not yet
   * been reported, so it should not automatically produce a
   * zero financial score.
   */

  if (totalBudget <= 0) {
    return 50;
  }

  if (totalSpent <= 0) {
    return 50;
  }

  if (utilisationRate > 100) {
    return 0;
  }

  if (utilisationRate < 25) {
    return 50;
  }

  if (utilisationRate < 50) {
    return 65;
  }

  if (utilisationRate <= 90) {
    return 100;
  }

  return 75;
}

function calculateRiskHealth(
  overallRiskScore: number,
): number {
  return clamp(100 - overallRiskScore);
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

  const organisationHealth =
    dashboard.organisationHealth;

  /*
   * Executive scoring model
   *
   * Programme performance     30%
   * Project implementation     20%
   * Activity delivery          15%
   * Indicator performance      15%
   * Governance                 10%
   * Finance                    10%
   */

  const programmePerformance =
    clamp(organisationHealth.programmeScore);

  const projectImplementation =
    clamp(organisationHealth.projectScore);

  const activityDelivery =
    clamp(organisationHealth.activityScore);

  const indicatorPerformance =
    clamp(organisationHealth.indicatorScore);

  const governanceScore =
    clamp(
      governance.governanceScore ??
        governance.complianceRate ??
        0,
    );

  const financeScore =
    calculateFinanceHealth(
      finance.utilisationRate,
      finance.totalBudget,
      finance.totalSpent,
    );

  const riskHealth =
    calculateRiskHealth(
      risk.overallRiskScore,
    );

  const executiveScore = clamp(
    programmePerformance * 0.30 +
      projectImplementation * 0.20 +
      activityDelivery * 0.15 +
      indicatorPerformance * 0.15 +
      governanceScore * 0.10 +
      financeScore * 0.10,
  );

  const executivePriorities: string[] = [];

  if (programmePerformance < 70) {
    executivePriorities.push(
      "Review underperforming programmes and agree corrective actions.",
    );
  }

  if (projectImplementation < 70) {
    executivePriorities.push(
      "Strengthen project implementation and delivery oversight.",
    );
  }

  if (activityDelivery < 70) {
    executivePriorities.push(
      "Accelerate completion of outstanding implementation activities.",
    );
  }

  if (indicatorPerformance < 70) {
    executivePriorities.push(
      "Improve results reporting and indicator achievement tracking.",
    );
  }

  if (governanceScore < 70) {
    executivePriorities.push(
      "Address outstanding governance and compliance actions.",
    );
  }

  if (financeScore < 70) {
    executivePriorities.push(
      "Improve financial reporting and budget execution monitoring.",
    );
  }

  if (risk.portfolioRisk === "Critical") {
    executivePriorities.push(
      "Immediate executive intervention is required for critical portfolio risks.",
    );
  } else if (risk.portfolioRisk === "High") {
    executivePriorities.push(
      "Escalate high portfolio risks for management action.",
    );
  }

  return {
    dashboard,
    governance,
    finance,
    risk,

    executiveScore,

    scoreBreakdown: {
      programmePerformance,
      projectImplementation,
      activityDelivery,
      indicatorPerformance,
      governance: governanceScore,
      finance: financeScore,
      risk: riskHealth,
    },

    organisationStatus:
      classify(executiveScore),

    executivePriorities,
  };
}
