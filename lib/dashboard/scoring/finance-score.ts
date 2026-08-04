// ============================================================================
// File: lib/dashboard/scoring/finance-score.ts
// Description: Financial performance scoring engine.
// Future integration:
// - Budget utilisation
// - Budget variance
// - Expenditure tracking
// - Procurement performance
// - Financial reporting
// ============================================================================

export interface FinanceScoreInput {
  budget?: number;
  expenditure?: number;
  reportingComplete?: boolean;
}

export function calculateFinanceScore(
  data?: FinanceScoreInput,
): number {
  // Finance module not connected yet
  if (!data || !data.budget || data.budget <= 0) {
    return 50;
  }

  const utilisation = (data.expenditure ?? 0) / data.budget;

  let score = 100;

  // Penalise over-spending
  if (utilisation > 1) {
    score -= Math.min((utilisation - 1) * 100, 50);
  }

  // Penalise significant under-utilisation
  if (utilisation < 0.5) {
    score -= (0.5 - utilisation) * 40;
  }

  // Financial reporting not submitted
  if (data.reportingComplete === false) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}