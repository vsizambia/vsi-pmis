import prisma from "@/lib/prisma";

import type {
  GovernanceSummary,
} from "@/types/dashboard";


export async function getGovernanceHealth(): Promise<GovernanceSummary> {

  /**
   * Placeholder governance intelligence layer.
   *
   * Future integrations:
   * - Risk register
   * - Compliance tracker
   * - Policy management
   * - Audit management
   * - Board resolutions
   */


  const [
    totalProjects,
    totalProgrammes,
  ] = await Promise.all([
    prisma.project.count(),

    prisma.programme.count(),
  ]);


  const complianceRate =
    totalProjects + totalProgrammes === 0
      ? 0
      : Math.round(
          (
            (totalProjects /
              (totalProjects + totalProgrammes)) *
            100
          ),
        );


  return {

    highRisks: 0,

    mediumRisks: 0,

    lowRisks: 0,


    complianceRate,


    policiesDue: 0,

    auditsScheduled: 0,

  };
}