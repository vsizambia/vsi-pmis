// ============================================================================
// Organisation Health Intelligence
// ============================================================================

export interface OrganisationHealth {

  overallScore: number;

  status:
    | "Excellent"
    | "Healthy"
    | "Needs Attention"
    | "At Risk"
    | "Critical";


  /**
   * Executive dashboard indicators
   */
  healthScore: number;

  operationalReadiness: number;

  governanceReadiness: number;

  dataConfidence: number;


  /**
   * Component scoring dimensions
   */
  programmeScore: number;

  projectScore: number;

  activityScore: number;

  indicatorScore: number;

  governanceScore: number;

  financeScore: number;


  strengths: string[];

  concerns: string[];

  recommendations: string[];

}