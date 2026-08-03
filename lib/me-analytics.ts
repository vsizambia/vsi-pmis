export type MEAnalyticsInput = {
  indicators: {
    target: number;
    achieved: number;
  }[];

  beneficiaries: {
    number: number;
    category?: string | null;
  }[];

  projects: {
    progress: number;
  }[];
};

export function calculateMEAnalytics(
  data: MEAnalyticsInput
) {
  const totalIndicators =
    data.indicators.length;

  const achievedIndicators =
    data.indicators.filter(
      (indicator) =>
        indicator.achieved >= indicator.target
    ).length;

  const indicatorAchievementRate =
    totalIndicators === 0
      ? 0
      : Math.round(
          (achievedIndicators / totalIndicators) *
            100
        );

  const totalBeneficiaries =
    data.beneficiaries.reduce(
      (sum, item) =>
        sum + item.number,
      0
    );

  const averageProjectProgress =
    data.projects.length === 0
      ? 0
      : Math.round(
          data.projects.reduce(
            (sum, project) =>
              sum + project.progress,
            0
          ) / data.projects.length
        );

  return {
    totalIndicators,
    achievedIndicators,
    indicatorAchievementRate,
    totalBeneficiaries,
    averageProjectProgress,
  };
}