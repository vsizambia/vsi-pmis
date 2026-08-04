// ============================================================================
// File: lib/dashboard/scoring/health-classifier.ts
// Description: Central health classification engine.
// ============================================================================

import type { ProgrammeHealth } from "@/types/dashboard";

export interface HealthClassification {
  score: number;
  status: ProgrammeHealth["status"];
  color: "green" | "blue" | "yellow" | "red";
  label: string;
}

export function classifyHealth(
  score: number,
): HealthClassification {
  if (score >= 85) {
    return {
      score,
      status: "Excellent",
      color: "green",
      label: "Excellent",
    };
  }

  if (score >= 70) {
    return {
      score,
      status: "Good",
      color: "blue",
      label: "Good",
    };
  }

  if (score >= 50) {
    return {
      score,
      status: "Fair",
      color: "yellow",
      label: "Fair",
    };
  }

  return {
    score,
    status: "Poor",
    color: "red",
    label: "Poor",
  };
}