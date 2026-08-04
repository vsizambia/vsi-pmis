import prisma from "@/lib/prisma";

export interface IndicatorHealth {
  totalIndicators: number;

  measuredIndicators: number;

  unmeasuredIndicators: number;

  achievementScore: number;

  reportingRate: number;

  status:
    | "Excellent"
    | "Good"
    | "Developing"
    | "Needs Attention"
    | "Critical";
}


function calculateStatus(
  score: number,
): IndicatorHealth["status"] {
  if (score >= 85) return "Excellent";

  if (score >= 70) return "Good";

  if (score >= 50) return "Developing";

  if (score >= 30) return "Needs Attention";

  return "Critical";
}


function calculateIndicatorScore(
  target: number,
  achieved: number,
  hasAchievement: boolean,
): number {

  // Indicator exists but reporting has not started
  if (!hasAchievement && target > 0) {
    return 50;
  }


  // No target configured yet
  if (target === 0) {
    return 50;
  }


  return Math.min(
    (achieved / target) * 100,
    100,
  );
}


export async function getIndicatorHealth(): Promise<IndicatorHealth> {

  const indicators =
    await prisma.indicator.findMany();


  const totalIndicators =
    indicators.length;


  const measuredIndicators =
    indicators.filter(
      (indicator) =>
        indicator.achieved !== null &&
        indicator.target !== null,
    );


  const unmeasuredIndicators =
    totalIndicators -
    measuredIndicators.length;


  const achievementScore =
    totalIndicators === 0
      ? 0
      : Math.round(
          indicators.reduce(
            (total, indicator) => {

              const target =
                Number(
                  indicator.target ?? 0,
                );


              const achieved =
                Number(
                  indicator.achieved ?? 0,
                );


              return (
                total +
                calculateIndicatorScore(
                  target,
                  achieved,
                  indicator.achieved !== null,
                )
              );

            },
            0,
          ) / totalIndicators,
        );


  const reportingRate =
    totalIndicators === 0
      ? 0
      : Math.round(
          (measuredIndicators.length /
            totalIndicators) *
            100,
        );


  return {
    totalIndicators,

    measuredIndicators:
      measuredIndicators.length,

    unmeasuredIndicators,

    achievementScore,

    reportingRate,

    status:
      calculateStatus(
        achievementScore,
      ),
  };
}