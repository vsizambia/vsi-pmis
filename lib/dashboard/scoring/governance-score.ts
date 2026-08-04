// ============================================================================
// File: lib/dashboard/scoring/governance-score.ts
// Description: Governance scoring engine.
// Future integration:
// - Risk Register
// - Compliance Register
// - Internal Audits
// - Policy Compliance
// ============================================================================

export interface GovernanceScoreInput {
  highRisks?: number;
  overduePolicies?: number;
  overdueAudits?: number;
  complianceRate?: number;
}

export function calculateGovernanceScore(
  data?: GovernanceScoreInput,
): number {
  // Governance module not connected yet
  if (!data) {
    return 50;
  }

  let score = data.complianceRate ?? 50;

  score -= (data.highRisks ?? 0) * 10;
  score -= (data.overduePolicies ?? 0) * 5;
  score -= (data.overdueAudits ?? 0) * 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}