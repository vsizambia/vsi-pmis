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

  if (score >= 85) {
    return "Excellent";
  }

  if (score >= 70) {
    return "Good";
  }

  if (score >= 50) {
    return "Developing";
  }

  if (score >= 30) {
    return "Needs Attention";
  }

  return "Critical";
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
    measuredIndicators.length === 0
      ? 50
      : Math.round(
          measuredIndicators.reduce(
            (total, indicator) => {

              const target =
                Number(
                  indicator.target ?? 0,
                );


              const achieved =
                Number(
                  indicator.achieved ?? 0,
                );


              if (target === 0) {
                return total + 50;
              }


              return (
                total +
                Math.min(
                  (achieved / target) * 100,
                  100,
                )
              );

            },
            0,
          ) /
            measuredIndicators.length,
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