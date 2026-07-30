import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Starting VSI-PMIS database seed...");
// =====================================================
// ROLES
// =====================================================

const administratorRole = await prisma.role.upsert({
  where: { name: "Administrator" },
  update: {
    code: "ADMIN",
  },
  create: {
    name: "Administrator",
    code: "ADMIN",
  },
});

const executiveDirectorRole = await prisma.role.upsert({
  where: { name: "Executive Director" },
  update: {
    code: "EXEC_DIR",
  },
  create: {
    name: "Executive Director",
    code: "EXEC_DIR",
  },
});

const programmeManagerRole = await prisma.role.upsert({
  where: { name: "Programme Manager" },
  update: {
    code: "PROG_MGR",
  },
  create: {
    name: "Programme Manager",
    code: "PROG_MGR",
  },
});

const financeOfficerRole = await prisma.role.upsert({
  where: { name: "Finance Officer" },
  update: {
    code: "FIN_OFF",
  },
  create: {
    name: "Finance Officer",
    code: "FIN_OFF",
  },
});

const meOfficerRole = await prisma.role.upsert({
  where: { name: "Monitoring & Evaluation Officer" },
  update: {
    code: "ME_OFF",
  },
  create: {
    name: "Monitoring & Evaluation Officer",
    code: "ME_OFF",
  },
});

const volunteerRole = await prisma.role.upsert({
  where: { name: "Volunteer" },
  update: {
    code: "VOL",
  },
  create: {
    name: "Volunteer",
    code: "VOL",
  },
});

console.log("✅ Roles seeded.");
  // =====================================================
  // ADMINISTRATOR
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
      roleId: administratorRole.id,
    },
  });

  console.log("✅ Administrator account seeded.");

// =====================================================
// DIRECTORATES
// =====================================================

const programmesDirectorate = await prisma.directorate.upsert({
  where: { name: "Directorate of Programmes" },
  update: {
    code: "PROGRAMMES",
  },
  create: {
    name: "Directorate of Programmes",
    code: "PROGRAMMES",
    description:
      "Responsible for programme design, implementation, monitoring, partnerships and delivery.",
  },
});

const policyDirectorate = await prisma.directorate.upsert({
  where: { name: "Directorate of Policy, Advocacy and Research" },
  update: {
    code: "POLICY",
  },
  create: {
    name: "Directorate of Policy, Advocacy and Research",
    code: "POLICY",
    description:
      "Responsible for policy analysis, advocacy, research and knowledge management.",
  },
});

const financeDirectorate = await prisma.directorate.upsert({
  where: { name: "Directorate of Finance and Administration" },
  update: {
    code: "FINADMIN",
  },
  create: {
    name: "Directorate of Finance and Administration",
    code: "FINADMIN",
    description:
      "Responsible for finance, administration, procurement, ICT, logistics and human resources.",
  },
});

const mealDirectorate = await prisma.directorate.upsert({
  where: { name: "Directorate of Monitoring, Evaluation, Accountability and Learning" },
  update: {
    code: "MEAL",
  },
  create: {
    name: "Directorate of Monitoring, Evaluation, Accountability and Learning",
    code: "MEAL",
    description:
      "Responsible for monitoring, evaluation, accountability, learning and organisational performance.",
  },
});

const communicationsDirectorate = await prisma.directorate.upsert({
  where: { name: "Directorate of Communications and Resource Mobilisation" },
  update: {
    code: "COMMS",
  },
  create: {
    name: "Directorate of Communications and Resource Mobilisation",
    code: "COMMS",
    description:
      "Responsible for communications, branding, media relations, partnerships and resource mobilisation.",
  },
});

const legalDirectorate = await prisma.directorate.upsert({
  where: { name: "Directorate of Legal and Compliance" },
  update: {
    code: "LEGAL",
  },
  create: {
    name: "Directorate of Legal and Compliance",
    code: "LEGAL",
    description:
      "Responsible for legal affairs, governance, compliance, risk management and policy oversight.",
  },
});

console.log("✅ Directorates seeded.");
    // =====================================================
  // PROGRAMMES
  // =====================================================

  const civicProgramme = await prisma.programme.upsert({
    where: {
      name: "Civic Leadership and Democratic Governance Programme",
    },
    update: {},
    create: {
      name: "Civic Leadership and Democratic Governance Programme",
      description:
        "Preparing students for mental resilience and civic leadership.",
      startYear: 2026,
      endYear: 2030,
      directorateId: programmesDirectorate.id,
    },
  });

  const youthProgramme = await prisma.programme.upsert({
    where: {
      name: "Youth Empowerment Programme",
    },
    update: {},
    create: {
      name: "Youth Empowerment Programme",
      description:
        "Promoting youth participation, entrepreneurship and skills development.",
      startYear: 2026,
      endYear: 2030,
      directorateId: programmesDirectorate.id,
    },
  });

  const mentalHealthProgramme = await prisma.programme.upsert({
    where: {
      name: "Mental Health Resilience Programme",
    },
    update: {},
    create: {
      name: "Mental Health Resilience Programme",
      description:
        "Strengthening resilience and psychosocial wellbeing among young people.",
      startYear: 2026,
      endYear: 2030,
      directorateId: programmesDirectorate.id,
    },
  });

  const communityProgramme = await prisma.programme.upsert({
    where: {
      name: "Community Development Programme",
    },
    update: {},
    create: {
      name: "Community Development Programme",
      description:
        "Supporting sustainable community development initiatives.",
      startYear: 2026,
      endYear: 2030,
      directorateId: programmesDirectorate.id,
    },
  });

  console.log("✅ Programmes seeded.");

  // =====================================================
  // INDICATORS
  // =====================================================

  const indicators = [
    {
      programmeId: civicProgramme.id,
      name: "Students Trained",
      baseline: "0",
      target: "10000",
      achieved: "0",
    },
    {
      programmeId: civicProgramme.id,
      name: "Schools Reached",
      baseline: "0",
      target: "200",
      achieved: "0",
    },
    {
      programmeId: youthProgramme.id,
      name: "Youth Empowered",
      baseline: "0",
      target: "5000",
      achieved: "0",
    },
    {
      programmeId: youthProgramme.id,
      name: "Youth Clubs Established",
      baseline: "0",
      target: "100",
      achieved: "0",
    },
    {
      programmeId: mentalHealthProgramme.id,
      name: "Mental Health Sessions Conducted",
      baseline: "0",
      target: "300",
      achieved: "0",
    },
    {
      programmeId: mentalHealthProgramme.id,
      name: "Counsellors Trained",
      baseline: "0",
      target: "150",
      achieved: "0",
    },
    {
      programmeId: communityProgramme.id,
      name: "Community Projects Implemented",
      baseline: "0",
      target: "50",
      achieved: "0",
    },
    {
      programmeId: communityProgramme.id,
      name: "Community Members Reached",
      baseline: "0",
      target: "50000",
      achieved: "0",
    },
  ];

  for (const indicator of indicators) {
    await prisma.indicator.upsert({
      where: {
        name: indicator.name,
      },
      update: {
        baseline: indicator.baseline,
        target: indicator.target,
        achieved: indicator.achieved,
        programmeId: indicator.programmeId,
      },
      create: indicator,
    });
  }

  console.log("✅ Indicators seeded.");
    // =====================================================
  // PROJECTS
  // =====================================================

  const projectDefinitions = [
    {
      programme: civicProgramme,
      name: "Mental Resilience in Secondary Schools",
      description:
        "Training learners in civic leadership and mental resilience.",
      budget: 150000,
      status: "Ongoing",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-12-31"),
    },
    {
      programme: youthProgramme,
      name: "Youth Innovation and Entrepreneurship",
      description:
        "Supporting entrepreneurship and innovation among young people.",
      budget: 225000,
      status: "Planned",
      startDate: new Date("2026-02-01"),
      endDate: new Date("2026-11-30"),
    },
    {
      programme: mentalHealthProgramme,
      name: "School Mental Health Initiative",
      description:
        "Strengthening mental health services in secondary schools.",
      budget: 180000,
      status: "Ongoing",
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-12-15"),
    },
    {
      programme: communityProgramme,
      name: "Community Volunteer Mobilisation",
      description:
        "Mobilising volunteers for sustainable community development.",
      budget: 120000,
      status: "Planned",
      startDate: new Date("2026-04-01"),
      endDate: new Date("2026-10-31"),
    },
  ];

 const projects: Awaited<ReturnType<typeof prisma.project.upsert>>[] = [];

  for (const item of projectDefinitions) {
    const project = await prisma.project.upsert({
      where: {
        name: item.name,
      },
      update: {
        description: item.description,
        budget: item.budget,
        currency: "ZMW",
        status: item.status,
        startDate: item.startDate,
        endDate: item.endDate,
        programmeId: item.programme.id,
        projectManagerId: administrator.id,
      },
      create: {
        name: item.name,
        description: item.description,
        budget: item.budget,
        currency: "ZMW",
        status: item.status,
        startDate: item.startDate,
        endDate: item.endDate,
        programmeId: item.programme.id,
        projectManagerId: administrator.id,
      },
    });

    projects.push(project);
  }

  console.log("✅ Projects seeded.");

  // =====================================================
  // PROJECT LOCATIONS
  // =====================================================

  for (const project of projects) {
    const exists = await prisma.projectLocation.findFirst({
      where: {
        projectId: project.id,
      },
    });

    if (!exists) {
      await prisma.projectLocation.create({
        data: {
          projectId: project.id,
          country: "Zambia",
          province: "Lusaka",
          district: "Lusaka",
        },
      });
    }
  }

  console.log("✅ Project locations seeded.");

  // =====================================================
  // ACTIVITIES
  // =====================================================

  for (const project of projects) {
    const titles = [
      "Project Launch",
      "Stakeholder Meeting",
      "Capacity Building Workshop",
      "Field Monitoring Visit",
      "Project Evaluation",
    ];

    for (const title of titles) {
      const exists = await prisma.activity.findFirst({
        where: {
          projectId: project.id,
          title,
        },
      });

      if (!exists) {
        await prisma.activity.create({
          data: {
            title,
            description: `${title} for ${project.name}`,
            status: "Planned",
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-08-02"),
            projectId: project.id,
          },
        });
      }
    }
  }

  console.log("✅ Activities seeded.");

  // =====================================================
  // BENEFICIARIES
  // =====================================================

  for (const project of projects) {
    const exists = await prisma.beneficiary.findFirst({
      where: {
        projectId: project.id,
      },
    });

    if (!exists) {
      await prisma.beneficiary.create({
        data: {
          projectId: project.id,
          gender: "Mixed",
          age: 17,
          ageGroup: "Children (0-17)",
          number: 500,
        },
      });
    }
  }

  console.log("✅ Beneficiaries seeded.");
    // =====================================================
  // SUMMARY
  // =====================================================

  const [
    roleCount,
    userCount,
    directorateCount,
    programmeCount,
    indicatorCount,
    projectCount,
    activityCount,
    beneficiaryCount,
    locationCount,
  ] = await Promise.all([
    prisma.role.count(),
    prisma.user.count(),
    prisma.directorate.count(),
    prisma.programme.count(),
    prisma.indicator.count(),
    prisma.project.count(),
    prisma.activity.count(),
    prisma.beneficiary.count(),
    prisma.projectLocation.count(),
  ]);

  console.log("");
  console.log("===========================================");
  console.log("🎉 VSI-PMIS DATABASE SEEDED SUCCESSFULLY");
  console.log("===========================================");
  console.log(`Roles           : ${roleCount}`);
  console.log(`Users           : ${userCount}`);
  console.log(`Directorates    : ${directorateCount}`);
  console.log(`Programmes      : ${programmeCount}`);
  console.log(`Indicators      : ${indicatorCount}`);
  console.log(`Projects        : ${projectCount}`);
  console.log(`Activities      : ${activityCount}`);
  console.log(`Beneficiaries   : ${beneficiaryCount}`);
  console.log(`Locations       : ${locationCount}`);
  console.log("===========================================");
  console.log("");
  console.log("Administrator Account");
  console.log("---------------------");
  console.log("Email    : admin@vsi.org.zm");
  console.log("Password : Admin@123");
  console.log("");
  console.log("🌱 Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("");
    console.error("❌ Database seeding failed.");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });