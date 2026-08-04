// ============================================================================
// File: lib/dashboard/scoring/activity-score.ts
// Description: Calculates programme activity implementation performance.
// ============================================================================

export interface ActivityStatusInput {
  status: string;
}

function getActivityScore(status: string): number {
  switch (status) {
    case "COMPLETED":
      return 100;

    case "ACTIVE":
      return 70;

    case "PLANNED":
      return 30;

    case "SUSPENDED":
      return 0;

    default:
      return 0;
  }
}

export function calculateActivityScore(
  activities: ActivityStatusInput[],
): number {
  if (activities.length === 0) {
    return 0;
  }

  const totalScore = activities.reduce(
    (total, activity) => total + getActivityScore(activity.status),
    0,
  );

  return Math.round(totalScore / activities.length);
}