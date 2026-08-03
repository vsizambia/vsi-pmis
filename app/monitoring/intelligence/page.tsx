import prisma from "@/lib/prisma";
import { calculateMEAnalytics } from "@/lib/me-analytics";

import IndicatorDashboard from "@/components/monitoring/intelligence/IndicatorDashboard";
import ResultsProgressChart from "@/components/monitoring/intelligence/ResultsProgressChart";
import TargetAchievement from "@/components/monitoring/intelligence/TargetAchievement";
import OutcomePerformance from "@/components/monitoring/intelligence/OutcomePerformance";
import BeneficiaryAnalytics from "@/components/monitoring/intelligence/BeneficiaryAnalytics";
import GeographicCoverage from "@/components/monitoring/intelligence/GeographicCoverage";
import DonorReportingMetrics from "@/components/monitoring/intelligence/DonorReportingMetrics";
import MEAlerts from "@/components/monitoring/intelligence/MEAlerts";

export default async function MonitoringIntelligencePage() {
  const projects = await prisma.project.findMany({
    include: {
      indicators: true,
      beneficiaries: true,
      updates: true,
      risks: true,
      locations: true,
    },
  });

  const analytics = calculateMEAnalytics({
    indicators: projects.flatMap((project) =>
      project.indicators.map((indicator) => ({
        target: Number(indicator.target ?? 0),
        achieved: Number(indicator.achieved ?? 0),
      }))
    ),

    beneficiaries: projects.flatMap((project) =>
      project.beneficiaries.map((beneficiary) => ({
        number: beneficiary.number,
        category: beneficiary.ageGroup,
      }))
    ),

    projects: projects.map((project) => ({
      progress: project.progress,
    })),
  });


  const beneficiaryCategories =
    Object.entries(
      projects
        .flatMap((project) => project.beneficiaries)
        .reduce<Record<string, number>>(
          (acc, beneficiary) => {
            const category =
              beneficiary.ageGroup ||
              "Unclassified";

            acc[category] =
              (acc[category] ?? 0) +
              beneficiary.number;

            return acc;
          },
          {}
        )
    ).map(([name, value]) => ({
      name,
      value,
    }));


  const highRiskProjects =
    projects.filter(
      (project) =>
        project.riskLevel === "HIGH"
    ).length;


  const projectsWithoutUpdates =
    projects.filter(
      (project) =>
        project.updates.length === 0
    ).length;


  const geographicCoverage =
    projects.flatMap((project) =>
      project.locations.map((location) => ({
        name:
          location.district,
        beneficiaries: 0,
        projects: 1,
      }))
    );


  const totalBudget =
    projects.reduce(
      (sum, project) =>
        sum + Number(project.budget ?? 0),
      0
    );


  return (
    <main className="space-y-8 p-8">

      <div>
        <h1 className="text-3xl font-bold text-[#003566]">
          M&E Results Intelligence
        </h1>

        <p className="mt-2 text-gray-500">
          Evidence-based monitoring, evaluation and results performance analysis.
        </p>
      </div>


      <IndicatorDashboard
        totalIndicators={
          analytics.totalIndicators
        }
        achievedIndicators={
          analytics.achievedIndicators
        }
        achievementRate={
          analytics.indicatorAchievementRate
        }
      />


      <ResultsProgressChart
        planned={
          analytics.totalIndicators
        }
        achieved={
          analytics.achievedIndicators
        }
      />


      <TargetAchievement
        target={
          analytics.totalIndicators
        }
        achieved={
          analytics.achievedIndicators
        }
      />


      <OutcomePerformance
        outcomes={[
          {
            name: "Overall Programme Results",
            target:
              analytics.totalIndicators,
            achieved:
              analytics.achievedIndicators,
          },
        ]}
      />


      <BeneficiaryAnalytics
        totalBeneficiaries={
          analytics.totalBeneficiaries
        }
        categories={
          beneficiaryCategories
        }
      />


      <GeographicCoverage
        locations={
          geographicCoverage
        }
      />


      <DonorReportingMetrics
        activeProjects={
          projects.length
        }
        totalBudget={
          totalBudget
        }
        beneficiariesReached={
          analytics.totalBeneficiaries
        }
        achievedResults={
          analytics.achievedIndicators
        }
      />


      <MEAlerts
        lowPerformingIndicators={
          analytics.totalIndicators -
          analytics.achievedIndicators
        }
        projectsWithoutUpdates={
          projectsWithoutUpdates
        }
        highRiskProjects={
          highRiskProjects
        }
        delayedProjects={0}
      />

    </main>
  );
}