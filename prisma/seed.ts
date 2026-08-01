import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Starting VSI-PMIS Enterprise seed...");

  // =====================================================
  // ROLES
  // =====================================================

  const roles = [
    ["ADMIN", "Administrator"],
    ["EXEC_DIR", "Executive Director"],
    ["PROG_DIR", "Programme Director"],
    ["PROG_MGR", "Programme Manager"],
    ["MEAL_MGR", "MEAL Manager"],
    ["FIN_MGR", "Finance Manager"],
    ["HR_ADMIN", "Human Resources Administrator"],
    ["PROC_OFF", "Procurement Officer"],
    ["COMM_OFF", "Communications Officer"],
    ["PROJECT_OFF", "Project Officer"],
    ["RESEARCH_OFF", "Research Officer"],
    ["VOL_COORD", "Volunteer Coordinator"],
    ["ICT_ADMIN", "ICT Administrator"],
    ["LEGAL_OFF", "Legal and Compliance Officer"],
    ["VOL", "Volunteer"],
  ];

  const roleMap: Record<string, string> = {};

  for (const [code, name] of roles) {
    const role = await prisma.role.upsert({
      where: { name },
      update: { code },
      create: {
        code,
        name,
      },
    });

    roleMap[code] = role.id;
  }

  console.log("✅ Roles seeded.");

  // =====================================================
  // DIRECTORATES
  // =====================================================

  const directorates = [
    {
      code: "EXECDIR",
      name: "Executive Director's Office",
      description:
        "Provides strategic leadership, governance oversight and organisational direction.",
    },
    {
      code: "PROGRAMMES",
      name: "Directorate of Programmes",
      description:
        "Responsible for programme design, implementation and delivery.",
    },
    {
      code: "POLICY",
      name: "Directorate of Policy, Advocacy and Research",
      description:
        "Responsible for research, policy analysis and advocacy.",
    },
    {
      code: "MEAL",
      name: "Directorate of Monitoring, Evaluation, Accountability and Learning",
      description:
        "Responsible for monitoring, evaluation, accountability and organisational learning.",
    },
    {
      code: "FINADMIN",
      name: "Directorate of Finance and Administration",
      description:
        "Responsible for finance, procurement, ICT, HR and administration.",
    },
    {
      code: "COMMS",
      name: "Directorate of Communications and Resource Mobilisation",
      description:
        "Responsible for communications, branding, partnerships and fundraising.",
    },
    {
      code: "LEGAL",
      name: "Directorate of Legal and Compliance",
      description:
        "Responsible for legal affairs, compliance and risk management.",
    },
  ];

  const directorateMap: Record<string, string> = {};

  for (const item of directorates) {
    const directorate = await prisma.directorate.upsert({
      where: { name: item.name },
      update: {
        code: item.code,
        description: item.description,
      },
      create: item,
    });

    directorateMap[item.code] = directorate.id;
  }

  console.log("✅ Directorates seeded.");

  // =====================================================
  // ADMIN USER
  // =====================================================

  const password = await bcrypt.hash("Admin@123", 10);

  const administrator = await prisma.user.upsert({
    where: {
      email: "admin@vsi.org.zm",
    },
    update: {},
    create: {
      name: "System Administrator",
      email: "admin@vsi.org.zm",
      password,
      roleId: roleMap.ADMIN,
      directorateId: directorateMap.EXECDIR,
    },
  });

  console.log("✅ Administrator seeded.");

  // =====================================================
  // PROGRAMMES
  // =====================================================

  const programmes = [
    {
      code: "CLDG",
      name: "Civic Leadership and Democratic Governance Programme",
      theme: "Youth leadership and democratic participation",
      description:
        "Preparing students for mental resilience and civic leadership.",
    },
    {
      code: "MHR",
      name: "Mental Health Resilience Programme",
      theme: "Psychosocial wellbeing",
      description:
        "Strengthening mental resilience among young people.",
    },
    {
      code: "YDP",
      name: "Youth Development Programme",
      theme: "Youth empowerment and skills development",
      description:
        "Promoting youth participation, entrepreneurship and innovation.",
    },
    {
      code: "CDP",
      name: "Community Development Programme",
      theme: "Community empowerment",
      description:
        "Supporting sustainable community development initiatives.",
    },
    {
      code: "VMP",
      name: "Volunteer Management Programme",
      theme: "Volunteer mobilisation",
      description:
        "Recruiting and managing VSI volunteers.",
    },
  ];

  const programmeMap: Record<string, string> = {};

  for (const item of programmes) {
    const programme = await prisma.programme.upsert({
      where: { name: item.name },
      update: {
        code: item.code,
        theme: item.theme,
      },
      create: {
        ...item,
        status: "ACTIVE",
        startYear: 2026,
        endYear: 2030,
        directorateId: directorateMap.PROGRAMMES,
      },
    });

    programmeMap[item.code] = programme.id;
  }

  console.log("✅ Programmes seeded.");

  // =====================================================
  // INDICATORS
  // =====================================================

  const indicators = [
    {
      code: "CLDG-IND-001",
      name: "Students Trained",
      unit: "Students",
      programmeId: programmeMap.CLDG,
      baseline: "0",
      target: "10000",
      achieved: "0",
    },
    {
      code: "CLDG-IND-002",
      name: "Schools Reached",
      unit: "Schools",
      programmeId: programmeMap.CLDG,
      baseline: "0",
      target: "200",
      achieved: "0",
    },
    {
      code: "MHR-IND-001",
      name: "Mental Health Sessions Conducted",
      unit: "Sessions",
      programmeId: programmeMap.MHR,
      baseline: "0",
      target: "300",
      achieved: "0",
    },
    {
      code: "YDP-IND-001",
      name: "Youth Empowered",
      unit: "Youth",
      programmeId: programmeMap.YDP,
      baseline: "0",
      target: "5000",
      achieved: "0",
    },
  ];

  for (const indicator of indicators) {
    await prisma.indicator.upsert({
      where: {
        name: indicator.name,
      },
      update: indicator,
      create: indicator,
    });
  }

  console.log("✅ Indicators seeded.");

  // =====================================================
  // PROJECTS
  // =====================================================

  const projects = [
    {
      referenceNo: "VSI-2026-001",
      code: "CLDG-001",
      name: "Mental Resilience in Secondary Schools",
      programmeId: programmeMap.CLDG,
      budget: 150000,
      donor: "VSI",
      fundingSource: "Internal Funding",
    },
    {
      referenceNo: "VSI-2026-002",
      code: "VSIACA-001",
      name: "VSI Academy Centre of Leadership Excellence",
      programmeId: programmeMap.CLDG,
      budget: 5000000,
      donor: "Strategic Partners",
      fundingSource: "Capital Development",
    },
    {
      referenceNo: "VSI-2026-003",
      code: "MHR-001",
      name: "School Mental Health Initiative",
      programmeId: programmeMap.MHR,
      budget: 180000,
      donor: "Partners",
      fundingSource: "Grant",
    },
    {
      referenceNo: "VSI-2026-004",
      code: "YDP-001",
      name: "Youth Innovation and Entrepreneurship",
      programmeId: programmeMap.YDP,
      budget: 225000,
      donor: "Partners",
      fundingSource: "Grant",
    },
  ];

  const projectIds: string[] = [];

  for (const item of projects) {
    const project = await prisma.project.upsert({
      where: {
        name: item.name,
      },
      update: item,
      create: {
        ...item,
        status: "ACTIVE",
        priority: "HIGH",
        riskLevel: "MEDIUM",
        progress: 0,
        currency: "ZMW",
        projectManagerId: administrator.id,
      },
    });

    projectIds.push(project.id);
  }

  console.log("✅ Projects seeded.");

  // =====================================================
  // SUMMARY
  // =====================================================

  console.log("");
  console.log("===========================================");
  console.log("🎉 VSI-PMIS ENTERPRISE SEED COMPLETE");
  console.log("===========================================");
  console.log(`Roles        : ${await prisma.role.count()}`);
  console.log(`Directorates : ${await prisma.directorate.count()}`);
  console.log(`Programmes   : ${await prisma.programme.count()}`);
  console.log(`Indicators   : ${await prisma.indicator.count()}`);
  console.log(`Projects     : ${await prisma.project.count()}`);
  console.log("===========================================");
  console.log("Admin Login");
  console.log("Email: admin@vsi.org.zm");
  console.log("Password: Admin@123");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed.");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
