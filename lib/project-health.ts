type ProjectHealthInput = {
  progress: number;
  riskLevel: string;
  activitiesCount: number;
  indicatorsCount: number;
  beneficiariesCount: number;
  updatesCount: number;
  issuesCount: number;
};
export function calculateProjectHealth(
  project: ProjectHealthInput
) {
  let score = 0;

  const strengths: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Progress assessment
  if (project.progress >= 75) {
    score += 40;
    strengths.push(
      "Strong implementation progress achieved"
    );
  } else if (project.progress >= 40) {
    score += 30;
    strengths.push(
      "Project implementation underway"
    );
  } else if (project.progress > 0) {
    score += 20;
    warnings.push(
      "Project progress is below expected levels"
    );
  } else {
    warnings.push(
      "Project progress has not started"
    );

    recommendations.push(
      "Update project implementation progress"
    );
  }


  // Activities
  if (project.activitiesCount > 0) {
    score += 15;

    strengths.push(
      "Implementation activities registered"
    );
  } else {
    warnings.push(
      "No implementation activities registered"
    );

    recommendations.push(
      "Register project activities"
    );
  }


  // Indicators
  if (project.indicatorsCount > 0) {
    score += 15;

    strengths.push(
      "Project indicators registered"
    );
  } else {
    warnings.push(
      "No indicators registered"
    );

    recommendations.push(
      "Develop project indicators and results framework"
    );
  }


  // Beneficiaries
  if (project.beneficiariesCount > 0) {
    score += 10;

    strengths.push(
      `${project.beneficiariesCount} beneficiaries reached`
    );
  } else {
    warnings.push(
      "No beneficiary records available"
    );
  }


  // Updates
  if (project.updatesCount > 0) {
    score += 10;

    strengths.push(
      "Progress updates submitted"
    );
  } else {
    warnings.push(
      "No progress updates submitted"
    );

    recommendations.push(
      "Submit regular project progress reports"
    );
  }


  // Risk adjustment
  if (project.riskLevel === "HIGH") {
    score -= 15;

    warnings.push(
      "High project risk level"
    );

    recommendations.push(
      "Review and strengthen risk mitigation measures"
    );
  }


  score = Math.max(0, Math.min(score, 100));


  return {
    score,

    status:
      score >= 75
        ? "Healthy"
        : score >= 50
        ? "Moderate"
        : "Attention Required",

    strengths,

    warnings,

    recommendations,
  };
}