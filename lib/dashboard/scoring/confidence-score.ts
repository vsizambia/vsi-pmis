// ============================================================================
// File: lib/dashboard/scoring/confidence-score.ts
// Description: Calculates confidence in programme health scores.
// ============================================================================

export interface ConfidenceScoreInput {
  hasProjects: boolean;
  hasActivities: boolean;
  hasIndicators: boolean;
  hasGovernance: boolean;
  hasFinance: boolean;
}

export interface ConfidenceResult {
  score: number;
  level: "High" | "Medium" | "Low";
  reasons: string[];
}

export function calculateConfidenceScore(
  data: ConfidenceScoreInput,
): ConfidenceResult {
  let score = 100;
  const reasons: string[] = [];

  if (!data.hasProjects) {
    score -= 20;
    reasons.push("No projects configured.");
  }

  if (!data.hasActivities) {
    score -= 20;
    reasons.push("No activities available.");
  }

  if (!data.hasIndicators) {
    score -= 25;
    reasons.push("No indicators configured.");
  }

  if (!data.hasGovernance) {
    score -= 20;
    reasons.push("Governance intelligence not connected.");
  }

  if (!data.hasFinance) {
    score -= 15;
    reasons.push("Finance intelligence not connected.");
  }

  score = Math.max(0, score);

  let level: ConfidenceResult["level"];

  if (score >= 80) {
    level = "High";
  } else if (score >= 50) {
    level = "Medium";
  } else {
    level = "Low";
  }

  return {
    score,
    level,
    reasons,
  };
}