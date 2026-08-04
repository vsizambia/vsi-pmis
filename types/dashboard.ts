// ============================================================================
// File: types/dashboard.ts
// Description: Shared TypeScript interfaces for the Executive Dashboard
// Project: VSI-PMIS
// ============================================================================

export type TrendDirection =
  | "up"
  | "down"
  | "neutral";


export type StatusColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "secondary";


export interface DashboardCard {
  title: string;

  value: string | number;

  subtitle?: string;

  icon?: string;

  trend?: TrendDirection;

  trendValue?: string;

  statusColor?: StatusColor;

  href?: string;
}


export interface DashboardSummary {
  totalDirectorates: number;

  totalProgrammes: number;

  totalProjects: number;

  activeProjects: number;

  completedProjects: number;

  suspendedProjects: number;

  totalActivities: number;

  completedActivities: number;

  totalIndicators: number;

  totalBeneficiaries: number;


  totalBudget?: number;

  totalExpenditure?: number;

  budgetUtilisation?: number;


  highRisks?: number;

  complianceRate?: number;
}


export interface ProgrammeHealth {
  id: string;

  programmeId: string;

  programmeName: string;


  implementationScore: number;

  activityScore: number;

  indicatorScore: number;

  governanceScore: number;

  financeScore: number;


  overallScore: number;


  healthDrivers: {
    name: string;

    score: number;
  }[];


  status:
    | "Excellent"
    | "Good"
    | "Fair"
    | "Poor";
}


export interface PortfolioOverview {
  activeProgrammes: number;

  activeProjects: number;

  completedProjects: number;

  totalActivities: number;

  completedActivities: number;

  beneficiariesReached: number;
}


export interface ExecutiveAlert {
  id: string;

  severity:
    | "critical"
    | "high"
    | "medium"
    | "low";

  title: string;

  description: string;

  createdAt: Date;

  href?: string;

  resolved: boolean;
}


export interface RecentActivity {
  id: string;

  title: string;

  description: string;


  module:
    | "Programme"
    | "Project"
    | "Activity"
    | "Beneficiary"
    | "Indicator"
    | "Governance"
    | "Finance";


  createdAt: Date;

  href?: string;
}


export interface StrategicObjectiveProgress {
  id: string;

  title: string;

  progress: number;

  status:
    | "On Track"
    | "Attention"
    | "Critical";
}


export interface GovernanceSummary {
  highRisks: number;

  mediumRisks: number;

  lowRisks: number;

  complianceRate: number;

  policiesDue: number;

  auditsScheduled: number;
}


export interface DashboardData {
  summary: DashboardSummary;

  portfolio: PortfolioOverview;

  programmeHealth: ProgrammeHealth[];

  governance: GovernanceSummary;

  strategicObjectives: StrategicObjectiveProgress[];

  alerts: ExecutiveAlert[];

  recentActivities: RecentActivity[];
}