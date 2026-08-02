import prisma from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";

import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectSummaryCards from "@/components/projects/ProjectSummaryCards";
import ProjectOverview from "@/components/projects/ProjectOverview";
import ActivityPerformance from "@/components/projects/ActivityPerformance";
import IndicatorPerformance from "@/components/projects/IndicatorPerformance";
import BeneficiarySummary from "@/components/projects/BeneficiarySummary";
import MilestoneOverview from "@/components/projects/MilestoneOverview";
import RiskOverview from "@/components/projects/RiskOverview";
import IssueOverview from "@/components/projects/IssueOverview";
import ProjectUpdates from "@/components/projects/ProjectUpdates";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      programme: true,
      projectManager: true,

      activities: {
        orderBy: {
          createdAt: "desc",
        },
      },

      beneficiaries: true,

      indicators: true,

      milestones: {
        orderBy: {
          dueDate: "asc",
        },
      },

      risks: {
        orderBy: {
          createdAt: "desc",
        },
      },

      issues: {
        orderBy: {
          createdAt: "desc",
        },
      },

      updates: {
        orderBy: {
          reportDate: "desc",
        },
      },
    },
  });


  if (!project) {
    return (
      <main className="p-8">
        <h1 className="text-xl font-bold">
          Project Not Found
        </h1>
      </main>
    );
  }


  const totalBeneficiaries =
    project.beneficiaries.reduce(
      (sum, item) =>
        sum + item.number,
      0
    );


  const summary = [
    {
      label: "Progress",
      value: `${project.progress}%`,
    },
    {
      label: "Budget",
      value: formatCurrency(
        project.budget,
        project.currency
      ),
    },
    {
      label: "Activities",
      value: project.activities.length,
    },
    {
      label: "Beneficiaries",
      value: totalBeneficiaries,
    },
    {
      label: "Indicators",
      value: project.indicators.length,
    },
    {
      label: "Open Risks",
      value: project.risks.filter(
        (risk) =>
          risk.status === "OPEN"
      ).length,
    },
    {
      label: "Open Issues",
      value: project.issues.filter(
        (issue) =>
          issue.status === "OPEN"
      ).length,
    },
  ];


  return (
    <main className="space-y-8 p-8">

      <ProjectHeader
        project={project}
      />


      <ProjectSummaryCards
        items={summary}
      />


      <ProjectOverview
        project={project}
      />


      <ActivityPerformance
        activities={project.activities}
      />


      <IndicatorPerformance
        indicators={project.indicators}
      />


      <BeneficiarySummary
        beneficiaries={project.beneficiaries}
      />


      <section className="grid gap-6 lg:grid-cols-3">

        <MilestoneOverview
          milestones={project.milestones}
        />

        <RiskOverview
          risks={project.risks}
        />

        <IssueOverview
          issues={project.issues}
        />

      </section>


      <ProjectUpdates
        updates={project.updates}
      />

    </main>
  );
}