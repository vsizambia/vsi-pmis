// ============================================================================
// File: lib/dashboard/scoring/indicator-score.ts
// Description: Calculates indicator performance for a single programme.
// ============================================================================

export interface IndicatorInput {
  target: string | number | null;
  achieved: string | number | null;
}

function scoreIndicator(
  target: number,
  achieved: number | null,
): number {
  // No target configured yet
  if (target === 0) {
    return 50;
  }

  // Target exists but reporting has not started
  if (achieved === null) {
    return 50;
  }

  // Prevent negative values
  if (achieved < 0) {
    return 0;
  }

  // Cap at 100%
  return Math.min((achieved / target) * 100, 100);
}

export function calculateIndicatorScore(
  indicators: IndicatorInput[],
): number {
  if (indicators.length === 0) {
    return 50;
  }

  const totalScore = indicators.reduce((total, indicator) => {
    return (
      total +
      scoreIndicator(
        Number(indicator.target ?? 0),
        indicator.achieved === null
          ? null
          : Number(indicator.achieved),
      )
    );
  }, 0);

  return Math.round(totalScore / indicators.length);
}