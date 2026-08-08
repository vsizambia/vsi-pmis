import React from "react";

import prisma from "@/lib/prisma";

import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  ClipboardList,
  AlertOctagon,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  RefreshCw,
  Calendar,
} from "lucide-react";


interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color:
    | "blue"
    | "emerald"
    | "amber"
    | "rose"
    | "purple"
    | "indigo";
}


interface RiskItem {
  id: string;
  title: string;
  category: string;
  severity:
    | "CRITICAL"
    | "HIGH"
    | "MEDIUM"
    | "LOW";
  score: number;
  owner: string;
  status: string;
}


interface AuditItem {
  id: string;
  title: string;
  project: string;
  priority: string;
  status: string;
}



function calculateRiskScore(
  probability: string,
  impact: string
) {
  const levels: Record<string, number> = {
    LOW: 25,
    MEDIUM: 50,
    HIGH: 75,
    CRITICAL: 100,
  };


  const probabilityScore =
    levels[
      probability?.toUpperCase()
    ] ?? 25;


  const impactScore =
    levels[
      impact?.toUpperCase()
    ] ?? 25;


  return Math.round(
    (probabilityScore + impactScore) / 2
  );
}



function calculateIndicatorPerformance(
  achieved?: string | null,
  target?: string | null
) {
  const achievedValue =
    Number(achieved);

  const targetValue =
    Number(target);


  if (
    Number.isNaN(achievedValue) ||
    Number.isNaN(targetValue) ||
    targetValue === 0
  ) {
    return 0;
  }


  return Math.min(
    100,
    Math.round(
      (achievedValue / targetValue) * 100
    )
  );
}




async function fetchGovernanceIntelligence() {

  const [
    projects,
    programmes,
    activities,
    indicators,
    beneficiaries,
    risks,
    issues,
  ] =
    await Promise.all([

      prisma.project.findMany({
        include:{
          programme:true,
          projectManager:true,
          risks:true,
          issues:true,
          activities:true,
          beneficiaries:true,
        },
      }),


      prisma.programme.findMany(),


      prisma.activity.findMany({
        include:{
          project:true,
        },
      }),


      prisma.indicator.findMany(),


      prisma.beneficiary.findMany(),


      prisma.projectRisk.findMany({
        include:{
          project:{
            include:{
              programme:true,
              projectManager:true,
            },
          },
        },
      }),


      prisma.projectIssue.findMany({
        include:{
          project:true,
        },
      }),

    ]);



  const completedProjects =
    projects.filter(
      project =>
        project.status === "COMPLETED"
    ).length;



  const activeProjects =
    projects.filter(
      project =>
        project.status === "ACTIVE"
    ).length;



  const totalProjectProgress = projects.reduce(
  (total, project) => total + project.progress,
  0
);

const projectProgress =
  projects.length === 0
    ? 0
    : Math.round(totalProjectProgress / projects.length);



  const completedActivities =
    activities.filter(
      activity =>
        activity.status === "COMPLETED"
    ).length;



  const activityScore =
    activities.length === 0
      ? 0
      :
      Math.round(
        (
          completedActivities /
          activities.length
        ) * 100
      );



  const indicatorScores =
    indicators.map(
      indicator =>
        calculateIndicatorPerformance(
          indicator.achieved,
          indicator.target
        )
    );



  const indicatorScore =
    indicatorScores.length === 0
      ? 0
      :
      Math.round(
        indicatorScores.reduce(
          (
            a,
            b
          ) =>
            a + b,
          0
        )
        /
        indicatorScores.length
      );



  const openRisks =
    risks.filter(
      risk =>
        risk.status !== "CLOSED"
    ).length;



  const criticalRisks =
    risks.filter(
      risk =>
        risk.impact === "CRITICAL"
        ||
        risk.probability === "CRITICAL"
    ).length;



  const openIssues =
    issues.filter(
      issue =>
        issue.status !== "RESOLVED"
    ).length;



  const riskScore =
  risks.length === 0
    ? 100
    :
    Math.round(
      (
        (
          risks.length -
          criticalRisks
        )
        /
        risks.length
      )
      * 100
    );

  const issueScore =
    issues.length === 0
      ? 100
      :
      Math.round(
        (
          (
            issues.length -
            openIssues
          )
          /
          issues.length
        )
        * 100
      );


const governanceScore =
  Math.round(
    (
      projectProgress * 0.40 +
      riskScore * 0.25 +
      issueScore * 0.15 +
      indicatorScore * 0.10 +
      activityScore * 0.10
    )
  );



  const riskItems: RiskItem[] =
  risks
    .slice(0, 5)
    .map((risk) => ({
      id: `RSK-${risk.id.slice(-6).toUpperCase()}`,

      title: risk.title,

      category: risk.project.programme.name,

      severity:
        risk.impact.toUpperCase() as RiskItem["severity"],

      score: calculateRiskScore(
        risk.probability,
        risk.impact
      ),

      owner:
        risk.project.projectManager?.name ??
        "Programme Manager",

      status: risk.status,
    }));



const auditItems: AuditItem[] =
  issues
    .slice(0, 5)
    .map((issue) => ({
      id: `AUD-${issue.id.slice(-6).toUpperCase()}`,

      title: issue.title,

      project: issue.project.name,

      priority: issue.priority,

      status: issue.status,
    }));


  return {
    stats:{
      governanceScore,

      activeRisks:
        openRisks,

      criticalRisks,

      compliance:
        governanceScore,

      findings:
        openIssues,

      pendingActions:
        activities.filter(
          activity =>
            activity.progress < 100
        ).length,

      alerts:
        criticalRisks,
    },


    portfolio:{
      projects:
        projects.length,

      activeProjects,

      completedProjects,

      programmes:
        programmes.length,

      beneficiaries:
        beneficiaries.reduce(
          (
            total,
            item
          ) =>
            total + item.number,
          0
        ),

      projectProgress,
    },


    riskItems,

    auditItems,

    activities,

    issues,

  };

}
const colorStyles = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-600 dark:text-blue-400",
  },

  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-600 dark:text-emerald-400",
  },

  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-600 dark:text-amber-400",
  },

  rose: {
    bg: "bg-rose-50 dark:bg-rose-950/40",
    text: "text-rose-600 dark:text-rose-400",
  },

  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/40",
    text: "text-purple-600 dark:text-purple-400",
  },

  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    text: "text-indigo-600 dark:text-indigo-400",
  },
};



function MetricCard({
  title,
  value,
  change,
  isPositive,
  subtitle,
  icon: Icon,
  color,
}: MetricCardProps) {


  const theme =
    colorStyles[color];


  return (

    <div className="
      rounded-xl
      border
      border-slate-200
      bg-white
      p-5
      shadow-sm
      transition
      hover:shadow-md
      dark:border-slate-800
      dark:bg-slate-900
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <span className="
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-slate-500
          dark:text-slate-400
        ">
          {title}
        </span>


        <div className={`
          rounded-lg
          p-2.5
          ${theme.bg}
          ${theme.text}
        `}>

          <Icon
            className="
              h-5
              w-5
            "
          />

        </div>

      </div>



      <div className="
        mt-3
        flex
        items-baseline
        justify-between
      ">

        <div className="
          text-3xl
          font-extrabold
          text-slate-900
          dark:text-slate-100
        ">
          {value}
        </div>



        <div className={`
          flex
          items-center
          text-xs
          font-semibold
          ${
            isPositive
            ?
            "text-emerald-600 dark:text-emerald-400"
            :
            "text-rose-600 dark:text-rose-400"
          }
        `}>

          {
            isPositive
            ?
            <ArrowUpRight className="h-3.5 w-3.5"/>
            :
            <ArrowDownRight className="h-3.5 w-3.5"/>
          }


          {change}

        </div>


      </div>



      <p className="
        mt-2
        text-xs
        text-slate-500
        dark:text-slate-400
      ">
        {subtitle}
      </p>


    </div>

  );

}




export default async function GovernanceIntelligencePage() {


  const data =
    await fetchGovernanceIntelligence();



  const {
    stats,
  } = data;



  return (

    <div className="
      min-h-screen
      bg-slate-50/50
      p-6
      text-slate-900
      dark:bg-slate-950
      dark:text-slate-100
      md:p-8
    ">



      <div className="
        mb-8
        flex
        flex-col
        gap-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      ">



        <div>


          <div className="
            flex
            items-center
            gap-2
          ">


            <span className="
              rounded-full
              bg-indigo-100
              px-3
              py-1
              text-xs
              font-semibold
              text-indigo-700
              dark:bg-indigo-950/60
              dark:text-indigo-300
            ">
              VSI-PMIS
            </span>


            <span className="
              text-xs
              text-slate-500
              dark:text-slate-400
            ">
              Governance Intelligence Platform
            </span>


          </div>



          <h1 className="
            mt-2
            text-3xl
            font-bold
            tracking-tight
            text-slate-900
            dark:text-slate-50
          ">
            Governance Intelligence
          </h1>



          <p className="
            mt-1
            text-sm
            text-slate-500
            dark:text-slate-400
          ">
            Real-time executive oversight, risk metrics, audit intelligence, and regulatory posture.
          </p>



        </div>





        <div className="
          flex
          flex-wrap
          items-center
          gap-3
        ">



          <div className="
            flex
            items-center
            rounded-lg
            border
            border-slate-200
            bg-white
            px-3
            py-2
            text-xs
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          ">

            <Calendar
              className="
                mr-2
                h-4
                w-4
                text-slate-400
              "
            />

            Q3 2026 Oversight

          </div>





          <button className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            border
            border-slate-200
            bg-white
            px-3
            py-2
            text-xs
            font-medium
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          ">

            <Filter className="h-4 w-4"/>

            Filter View

          </button>





          <button className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-indigo-600
            px-3
            py-2
            text-xs
            font-medium
            text-white
          ">

            <Download className="h-4 w-4"/>

            Export Executive Report

          </button>


        </div>


      </div>





      <div className="
        mb-8
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-6
      ">


        <MetricCard
          title="Governance Health Index"
          value={`${stats.governanceScore}%`}
          change="Live"
          isPositive={true}
          subtitle="Overall governance performance"
          icon={ShieldCheck}
          color="indigo"
        />



        <MetricCard
          title="Active Risks"
          value={stats.activeRisks}
          change={`${stats.criticalRisks} critical`}
          isPositive={false}
          subtitle="Programme risks requiring attention"
          icon={AlertTriangle}
          color="rose"
        />



        <MetricCard
          title="Governance Compliance Index"
          value={`${stats.compliance}%`}
          change="Live"
          isPositive={true}
          subtitle="Compliance and control maturity"
          icon={FileCheck}
          color="emerald"
        />



        <MetricCard
          title="Audit Findings"
          value={stats.findings}
          change="Tracked"
          isPositive={false}
          subtitle="Issues requiring corrective action"
          icon={ClipboardList}
          color="amber"
        />



        <MetricCard
          title="Outstanding Actions"
          value={stats.pendingActions}
          change="Open"
          isPositive={false}
          subtitle="Pending implementation actions"
          icon={Clock}
          color="blue"
        />



        <MetricCard
          title="Governance Alerts"
          value={stats.alerts}
          change="Urgent"
          isPositive={false}
          subtitle="Items requiring immediate attention"
          icon={AlertOctagon}
          color="purple"
        />



      </div>
            <div className="
        grid
        grid-cols-1
        gap-8
        lg:grid-cols-3
      ">


        <div className="
          space-y-8
          lg:col-span-2
        ">



          <div className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          ">


            <div className="
              flex
              items-center
              justify-between
              border-b
              border-slate-100
              pb-4
              dark:border-slate-800
            ">


              <div>

                <h2 className="
                  text-base
                  font-semibold
                ">
                  VSI Risk Intelligence Portfolio
                </h2>


                <p className="
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                ">
                  Live programme and project risks across the VSI portfolio
                </p>

              </div>


              <span className="
                rounded-full
                bg-slate-100
                px-3
                py-1
                text-xs
                font-medium
                dark:bg-slate-800
              ">
                Top Risks
              </span>


            </div>




            <div className="
              mt-4
              overflow-x-auto
            ">


              <table className="
                w-full
                text-left
                text-xs
              ">


                <thead>

                  <tr className="
                    border-b
                    border-slate-100
                    text-slate-400
                    dark:border-slate-800
                  ">


                    <th className="pb-3">
                      Risk Ref
                    </th>


                    <th className="pb-3">
                      Title & Category
                    </th>


                    <th className="pb-3">
                      Severity
                    </th>


                    <th className="pb-3">
                      Score
                    </th>


                    <th className="pb-3">
                      Owner
                    </th>


                    <th className="pb-3">
                      Status
                    </th>


                  </tr>

                </thead>



                <tbody className="
                  divide-y
                  divide-slate-100
                  dark:divide-slate-800
                ">


                  {
                    data.riskItems.length === 0
                    ?

                    (
                      <tr>

                        <td
                          colSpan={6}
                          className="
                            py-8
                            text-center
                            text-slate-500
                          "
                        >
                          No active risks recorded.
                        </td>

                      </tr>
                    )

                    :

                    data.riskItems.map(
                      (risk)=>(


                        <tr
                          key={risk.id}
                          className="
                            hover:bg-slate-50
                            dark:hover:bg-slate-800/40
                          "
                        >


                          <td className="
                            py-3
                            font-mono
                            font-semibold
                            text-indigo-600
                          ">
                            {risk.id}
                          </td>



                          <td className="py-3">

                            <div className="
                              font-medium
                            ">
                              {risk.title}
                            </div>


                            <div className="
                              text-[11px]
                              text-slate-400
                            ">
                              {risk.category}
                            </div>

                          </td>




                          <td className="py-3">


                            <span
                              className={`
                                rounded-md
                                px-2
                                py-1
                                text-[10px]
                                font-bold

                                ${
                                  risk.severity === "CRITICAL"
                                  ?
                                  "bg-rose-100 text-rose-700"
                                  :
                                  risk.severity === "HIGH"
                                  ?
                                  "bg-amber-100 text-amber-700"
                                  :
                                  risk.severity === "MEDIUM"
                                  ?
                                  "bg-blue-100 text-blue-700"
                                  :
                                  "bg-slate-100 text-slate-700"
                                }
                              `}
                            >
                              {risk.severity}
                            </span>


                          </td>




                          <td className="
                            py-3
                            font-semibold
                          ">
                            {risk.score}/100
                          </td>




                          <td className="py-3 text-slate-500">

                            {risk.owner}

                          </td>



                          <td className="py-3 text-slate-500">

                            {risk.status}

                          </td>



                        </tr>


                      )
                    )

                  }


                </tbody>


              </table>


            </div>


          </div>






          <div className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          ">



            <div className="
              flex
              items-center
              justify-between
              border-b
              border-slate-100
              pb-4
            ">


              <div>

                <h2 className="
                  text-base
                  font-semibold
                ">
                  Audit Findings & Corrective Actions
                </h2>


                <p className="
                  text-xs
                  text-slate-500
                ">
                  Issues requiring corrective action
                </p>


              </div>


              <span className="
                text-xs
                font-semibold
                text-indigo-600
              ">
                Live Issues
              </span>


            </div>




            <div className="
              mt-4
              space-y-3
            ">



              {
                data.auditItems.length === 0

                ?

                (
                  <div className="
                    rounded-lg
                    bg-slate-50
                    p-4
                    text-center
                    text-sm
                    text-slate-500
                  ">
                    No unresolved findings.
                  </div>
                )


                :


                data.auditItems.map(
                  item=>(


                    <div
                      key={item.id}
                      className="
                        rounded-lg
                        border
                        border-slate-100
                        bg-slate-50/50
                        p-4
                        dark:border-slate-800
                        dark:bg-slate-800/30
                      "
                    >


                      <div className="
                        flex
                        justify-between
                      ">


                        <span className="
                          font-mono
                          text-xs
                          font-bold
                        ">
                          {item.id}
                        </span>


                        <span className="
                          rounded
                          bg-amber-100
                          px-2
                          py-1
                          text-[10px]
                          font-semibold
                          text-amber-700
                        ">
                          {item.priority}
                        </span>


                      </div>



                      <p className="
                        mt-2
                        text-xs
                        font-medium
                      ">
                        {item.title}
                      </p>



                      <p className="
                        mt-1
                        text-[11px]
                        text-slate-500
                      ">
                        Project: {item.project}
                      </p>



                      <p className="
                        mt-1
                        text-[11px]
                        text-slate-500
                      ">
                        Status: {item.status}
                      </p>


                    </div>


                  )
                )

              }


            </div>


          </div>





        </div>
                <div className="
          space-y-8
        ">



          <div className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          ">


            <div className="
              border-b
              border-slate-100
              pb-3
              dark:border-slate-800
            ">

              <h2 className="
                text-base
                font-semibold
              ">
                VSI Governance Compliance Health
              </h2>


              <p className="
                text-xs
                text-slate-500
              ">
                VSI governance posture
              </p>


            </div>




            <div className="
              mt-4
              space-y-4
            ">


              {
                [
                  {
    name: "Project Delivery Performance",

    score:
      data.portfolio.projects === 0
        ? 0
        : Math.round(
            data.portfolio.projectProgress
          ),

    controls: null,

    passed:
      `Average Project Progress`,
    },

                  {
                    name:
                      "Programme Oversight",

                    score:
                      data.portfolio.programmes > 0
                      ? 100
                      : 0,

                    controls:
                      data.portfolio.programmes,

                    passed:
                      data.portfolio.programmes,
                  },


                  {
                    name:
                      "Beneficiary Reporting",

                    score:
                      data.portfolio.beneficiaries > 0
                      ? 100
                      : 0,

                    controls:
                      data.portfolio.beneficiaries,

                    passed:
                      data.portfolio.beneficiaries,
                  },


                ].map(
                  item=>(


                    <div
                      key={item.name}
                      className="
                        space-y-2
                      "
                    >


                      <div className="
                        flex
                        justify-between
                        text-xs
                      ">


                        <span className="
                          font-medium
                        ">
                          {item.name}
                        </span>


                        <span className="
                          font-bold
                        ">
                          {item.score}%
                        </span>


                      </div>




                      <div className="
                        h-2
                        overflow-hidden
                        rounded-full
                        bg-slate-100
                        dark:bg-slate-800
                      ">


                        <div
                          className={`
                            h-full
                            rounded-full

                            ${
                              item.score >= 90
                              ?
                              "bg-emerald-500"
                              :
                              item.score >= 70
                              ?
                              "bg-amber-500"
                              :
                              "bg-rose-500"
                            }
                          `}
                          style={{
                            width:
                              `${item.score}%`,
                          }}
                        />


                      </div>




                      <div className="
                        flex
                        justify-between
                        text-[11px]
                        text-slate-400
                      ">

                          <span>
                            {
                              item.controls
                                ? `${item.passed}/${item.controls} Verified`
                                : item.passed
                            }
                          </span>


                        <span>
                          {
                            item.score >= 80
                            ?
                            "COMPLIANT"
                            :
                            "NEEDS ATTENTION"
                          }
                        </span>


                      </div>


                    </div>


                  )
                )
              }


            </div>


          </div>






          <div className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          ">


            <div className="
              border-b
              border-slate-100
              pb-3
            ">


              <h2 className="
                text-base
                font-semibold
              ">
                Management Actions
              </h2>


              <p className="
                text-xs
                text-slate-500
              ">
                Activity execution monitoring
              </p>


            </div>





            <div className="
              mt-4
              space-y-4
            ">


              {
                data.activities
                .slice(0,5)
                .map(
                  activity=>(


                    <div
                      key={activity.id}
                      className="
                        rounded-lg
                        border
                        border-slate-100
                        p-3
                        dark:border-slate-800
                      "
                    >


                      <div className="
                        flex
                        justify-between
                        text-xs
                      ">


                        <span className="
                          font-semibold
                        ">
                          {activity.title}
                        </span>


                        <span>
                          {Math.round(activity.progress)}%
                        </span>


                      </div>



                      <div className="
                        mt-2
                        h-2
                        rounded-full
                        bg-slate-100
                        dark:bg-slate-800
                      ">


                        <div
                          className="
                            h-full
                            rounded-full
                            bg-indigo-600
                          "
                          style={{
                            width:
                              `${activity.progress}%`,
                          }}
                        />


                      </div>


                    </div>


                  )
                )
              }


            </div>


          </div>







          <div className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          ">


            <div className="
              flex
              items-center
              justify-between
              border-b
              border-slate-100
              pb-3
            ">


              <h2 className="
                text-base
                font-semibold
              ">
                Governance Feed
              </h2>


              <RefreshCw
                className="
                  h-4
                  w-4
                  text-slate-400
                "
              />


            </div>





            <div className="
              mt-4
              space-y-4
            ">



              {
                [
                  {
                    id:"1",
                    message:
                      `${data.stats.criticalRisks} critical ${
  data.stats.criticalRisks === 1 ? "risk" : "risks"
} currently require${
  data.stats.criticalRisks === 1 ? "s" : ""
} attention`,
                    timestamp:
                      "Live",
                    type:
                      "RISK",
                  },


                  {
                    id:"2",
                    message:
                      `${data.stats.findings} audit findings under review`,
                    timestamp:
                      "Live",
                    type:
                      "AUDIT",
                  },


                  {
                    id:"3",
                    message:
                      `${data.stats.pendingActions} activities remain incomplete`,
                    timestamp:
                      "Live",
                    type:
                      "ACTIVITY",
                  },


                ].map(
                  item=>(


                    <div
                      key={item.id}
                      className="
                        flex
                        gap-3
                        text-xs
                      "
                    >


                      <div>

                        {
                          item.type === "RISK"
                          ?

                          <XCircle
                            className="
                              h-4
                              w-4
                              text-rose-500
                            "
                          />

                          :

                          item.type === "AUDIT"

                          ?

                          <AlertTriangle
                            className="
                              h-4
                              w-4
                              text-amber-500
                            "
                          />

                          :

                          <CheckCircle2
                            className="
                              h-4
                              w-4
                              text-emerald-500
                            "
                          />
                        }

                      </div>



                      <div>

                        <p>
                          {item.message}
                        </p>


                        <span className="
                          text-[10px]
                          text-slate-400
                        ">
                          {item.timestamp}
                        </span>


                      </div>


                    </div>


                  )
                )
              }


            </div>


          </div>




        </div>



      </div>



    </div>

  );

}
