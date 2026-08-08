import prisma from "@/lib/prisma";

export interface FinanceIntelligence {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  utilisationRate: number;
  averageProjectBudget: number;
}

export async function getFinanceIntelligence(): Promise<FinanceIntelligence> {
  const projects = await prisma.project.findMany({
    select: {
      budget: true,
      spent: true,
    },
  });

  const totalBudget = projects.reduce(
    (sum, project) => sum + Number(project.budget ?? 0),
    0,
  );

  const totalSpent = projects.reduce(
    (sum, project) => sum + Number(project.spent ?? 0),
    0,
  );

  const remainingBudget = Math.max(totalBudget - totalSpent, 0);

  const utilisationRate =
    totalBudget === 0
      ? 0
      : Math.min(
          Math.round((totalSpent / totalBudget) * 100),
          100,
        );

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
