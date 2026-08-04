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


// ============================================================================
// Dashboard Cards
// ============================================================================

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


// ============================================================================
// Dashboard Summary
// ============================================================================

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


// ============================================================================
// Programme Health Intelligence
// ============================================================================

export interface HealthDriver {
  name: string;

  score: number;

  weight?: number;

  description?: string;
}


export type ProgrammeHealthStatus =
  | "Excellent"
  | "Good"
  | "Fair"
  | "Poor"
  | "Healthy"
  | "Needs Attention"
  | "At Risk"
  | "Critical";


export interface ProgrammeHealth {

  id: string;

  programmeId: string;

  programmeName: string;


  implementationScore: number;

  activityScore: number;

  indicatorScore: number;

  governanceScore: number;

  financeScore: number;


  /**
   * Reliability of available programme evidence.
   */
  dataConfidence: number;


  overallScore: number;


  status: ProgrammeHealthStatus;


  healthDrivers: HealthDriver[];


  strengths?: string[];

  concerns?: string[];

  recommendations?: string[];


  lastCalculated?: Date;
}


// ============================================================================
// Portfolio Overview
// ============================================================================

export interface PortfolioOverview {

  activeProgrammes: number;

  activeProjects: number;

  completedProjects: number;

  totalActivities: number;

  completedActivities: number;

  beneficiariesReached: number;
}


// ============================================================================
// Executive Alerts
// ============================================================================

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


// ============================================================================
// Recent Activity
// ============================================================================

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


// ============================================================================
// Strategic Objectives
// ============================================================================

export interface StrategicObjectiveProgress {

  id: string;

  title: string;

  progress: number;


  status:
    | "On Track"
    | "Attention"
    | "Critical";
}


// ============================================================================
// Governance Summary
// ============================================================================

export interface GovernanceSummary {

  highRisks: number;

  mediumRisks: number;

  lowRisks: number;


  complianceRate: number;


  policiesDue: number;

  auditsScheduled: number;
}


// ============================================================================
// Complete Dashboard Payload
// ============================================================================

export interface DashboardData {

  summary: DashboardSummary;


  portfolio: PortfolioOverview;


  programmeHealth: ProgrammeHealth[];


  governance: GovernanceSummary;


  strategicObjectives: StrategicObjectiveProgress[];


  alerts: ExecutiveAlert[];


  recentActivities: RecentActivity[];
}