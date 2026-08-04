// ============================================================================
// File: lib/dashboard/scoring/implementation-score.ts
// Description: Calculates programme implementation performance based on
// project implementation status.
// ============================================================================

export interface ProjectStatusInput {
  status: string;
}

function getProjectScore(status: string): number {
  switch (status) {
    case "COMPLETED":
      return 100;

    case "ACTIVE":
      return 75;

    case "PLANNED":
      return 25;

    case "SUSPENDED":
      return 0;

    default:
      return 0;
  }
}

export function calculateImplementationScore(
  projects: ProjectStatusInput[],
): number {
  if (projects.length === 0) {
    return 0;
  }

  const totalScore = projects.reduce(
    (total, project) => total + getProjectScore(project.status),
    0,
  );

  return Math.round(totalScore / projects.length);
}