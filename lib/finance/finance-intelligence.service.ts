import prisma from "@/lib/prisma";

export interface FinanceIntelligence {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  utilisationRate: number;
  averageProjectBudget: number;
}

export async function getFinanceIntelligence(): Promise<FinanceIntelligence> {
  const projects = await prisma.project.findMany();

  const totalBudget = projects.reduce(
    (sum, project) => sum + Number(project.budget ?? 0),
    0,
  );

  // Expenditure tracking will be implemented in the Finance module.
  const totalSpent = 0;

  const remainingBudget = totalBudget - totalSpent;

  const utilisationRate =
    totalBudget === 0
      ? 0
      : Math.round((totalSpent / totalBudget) * 100);

  const averageProjectBudget =
    projects.length === 0
      ? 0
      : Math.round(totalBudget / projects.length);

  return {
    totalBudget,
    totalSpent,
    remainingBudget,
    utilisationRate,
    averageProjectBudget,
  };
}