import prisma from "@/lib/prisma";

import type {
  DashboardData,
  DashboardSummary,
  PortfolioOverview,
  GovernanceSummary,
  ExecutiveAlert,
} from "@/types/dashboard";

import {
  getProgrammeHealth,
} from "@/lib/dashboard/programme-health.service";


/**
 * Dashboard Summary
 */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [
    totalDirectorates,
    totalProgrammes,
    totalProjects,
    activeProjects,
    completedProjects,
    suspendedProjects,
    totalActivities,
    completedActivities,
    totalIndicators,
    totalBeneficiaries,
  ] = await Promise.all([
    prisma.directorate.count(),

    prisma.programme.count(),

    prisma.project.count(),

    prisma.project.count({
      where: {
        status: "ACTIVE",
      },
    }),

    prisma.project.count({
      where: {
        status: "COMPLETED",
      },
    }),

    prisma.project.count({
      where: {
        status: "SUSPENDED",
      },
    }),

    prisma.activity.count(),

    prisma.activity.count({
      where: {
        status: "COMPLETED",
      },
    }),

    prisma.indicator.count(),

    prisma.beneficiary.count(),
  ]);


  return {
    totalDirectorates,

    totalProgrammes,

    totalProjects,

    activeProjects,

    completedProjects,

    suspendedProjects,

    totalActivities,

    completedActivities,

    totalIndicators,

    totalBeneficiaries,


    totalBudget: 0,

    totalExpenditure: 0,

    budgetUtilisation: 0,


    highRisks: 0,

    complianceRate: 0,
  };
}


/**
 * Portfolio Overview
 */
export async function getPortfolioOverview(): Promise<PortfolioOverview> {
  const summary =
    await getDashboardSummary();


  return {
    activeProgrammes:
      summary.totalProgrammes,

    activeProjects:
      summary.activeProjects,

    completedProjects:
      summary.completedProjects,

    totalActivities:
      summary.totalActivities,

    completedActivities:
      summary.completedActivities,

    beneficiariesReached:
      summary.totalBeneficiaries,
  };
}


/**
 * Governance Summary
 *
 * Will connect to Governance Intelligence module.
 */
export async function getGovernanceSummary(): Promise<GovernanceSummary> {
  return {
    highRisks: 0,

    mediumRisks: 0,

    lowRisks: 0,

    complianceRate: 0,

    policiesDue: 0,

    auditsScheduled: 0,
  };
}


/**
 * Executive Alerts Intelligence
 */
export async function getExecutiveAlerts(): Promise<
  ExecutiveAlert[]
> {
  const alerts: ExecutiveAlert[] = [];


  const [
    suspendedProjects,
    incompleteActivities,
    missingIndicators,
  ] = await Promise.all([

    prisma.project.count({
      where: {
        status: "SUSPENDED",
      },
    }),


    prisma.activity.count({
      where: {
        status: {
          not: "COMPLETED",
        },
      },
    }),


    prisma.indicator.count({
      where: {
        OR: [
          {
            target: null,
          },
          {
            achieved: null,
          },
        ],
      },
    }),

  ]);


  if (suspendedProjects > 0) {
    alerts.push({
      id: "suspended-projects",

      severity: "high",

      title:
        "Suspended projects require attention",

      description:
        `${suspendedProjects} project(s) are currently suspended and require management review.`,

      createdAt:
        new Date(),

      resolved: false,
    });
  }


  if (incompleteActivities > 0) {
    alerts.push({
      id: "incomplete-activities",

      severity: "medium",

      title:
        "Outstanding implementation activities",

      description:
        `${incompleteActivities} activity record(s) are not yet completed.`,

      createdAt:
        new Date(),

      resolved: false,
    });
  }


  if (missingIndicators > 0) {
    alerts.push({
      id: "indicator-data-gaps",

      severity: "medium",

      title:
        "Indicator data gaps detected",

      description:
        `${missingIndicators} indicator(s) require baseline, target or achievement updates.`,

      createdAt:
        new Date(),

      resolved: false,
    });
  }


  return alerts;
}


/**
 * Recent Activity
 *
 * Will connect to audit/activity timeline.
 */
export async function getRecentActivity() {
  return [];
}


/**
 * Complete VSI Dashboard Data
 */
export async function getDashboardData(): Promise<DashboardData> {

  const [
    summary,
    portfolio,
    governance,
    alerts,
    recentActivities,
    programmeHealth,
  ] = await Promise.all([

    getDashboardSummary(),

    getPortfolioOverview(),

    getGovernanceSummary(),

    getExecutiveAlerts(),

    getRecentActivity(),

    getProgrammeHealth(),

  ]);


  return {
    summary,

    portfolio,

    governance,

    alerts,

    recentActivities,

    programmeHealth,

    strategicObjectives: [],
  };
}