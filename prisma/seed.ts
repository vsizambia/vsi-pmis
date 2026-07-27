import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  // =============================
  // Roles
  // =============================

  const adminRole = await prisma.role.upsert({
    where: { name: "Administrator" },
    update: {},
    create: { name: "Administrator" },
  });

  const executiveRole = await prisma.role.upsert({
    where: { name: "Executive Director" },
    update: {},
    create: { name: "Executive Director" },
  });

  const programmeRole = await prisma.role.upsert({
    where: { name: "Programme Manager" },
    update: {},
    create: { name: "Programme Manager" },
  });

  const financeRole = await prisma.role.upsert({
    where: { name: "Finance Officer" },
    update: {},
    create: { name: "Finance Officer" },
  });

  const meRole = await prisma.role.upsert({
    where: { name: "Monitoring & Evaluation Officer" },
    update: {},
    create: { name: "Monitoring & Evaluation Officer" },
  });

  // =============================
  // Directorates
  // =============================

  const programmesDirectorate = await prisma.directorate.upsert({
    where: { name: "Programmes" },
    update: {},
    create: {
      name: "Programmes",
      description: "Programme implementation and management",
    },
  });

  const financeDirectorate = await prisma.directorate.upsert({
    where: { name: "Finance & Administration" },
    update: {},
    create: {
      name: "Finance & Administration",
      description: "Finance, HR and Administration",
    },
  });

  const communicationsDirectorate = await prisma.directorate.upsert({
    where: { name: "Communications" },
    update: {},
    create: {
      name: "Communications",
      description: "Communications and Partnerships",
    },
  });

  // Prevent unused variable warning
  void financeDirectorate;
  void communicationsDirectorate;

  // =============================
  // Programmes
  // =============================

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

  // =============================
  // Indicators
  // =============================

  await prisma.indicator.upsert({
    where: {
      name: "Students Trained",
    },
    update: {},
    create: {
      name: "Students Trained",
      baseline: "0",
      target: "10000",
      achieved: "0",
      programmeId: civicProgramme.id,
    },
  });

  await prisma.indicator.upsert({
    where: {
      name: "Schools Reached",
    },
    update: {},
    create: {
      name: "Schools Reached",
      baseline: "0",
      target: "200",
      achieved: "0",
      programmeId: civicProgramme.id,
    },
  });

  // =============================
  // Administrator
  // =============================

  const password = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@vsi.org.zm",
    },
    update: {},
    create: {
      name: "System Administrator",
      email: "admin@vsi.org.zm",
      password,
      roleId: adminRole.id,
    },
  });

  // =============================
  // Sample Project
  // =============================

  const project = await prisma.project.create({
    data: {
      name: "Mental Resilience in Secondary Schools",
      description:
        "Training learners in civic leadership and mental resilience.",
      status: "Active",
      budget: 150000,
      currency: "ZMW",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-12-31"),
      programmeId: civicProgramme.id,
      projectManagerId: admin.id,
    },
  });

  // =============================
  // Location
  // =============================

  await prisma.projectLocation.create({
    data: {
      projectId: project.id,
      country: "Zambia",
      province: "Lusaka",
      district: "Lusaka",
    },
  });

 // =============================
  // Beneficiary
  // =============================

  await prisma.beneficiary.create({
    data: {
      projectId: project.id,
      gender: "Mixed",
      age: 17,
      ageGroup: "Children (0-17)",
      number: 500,
    },
  });
  
  // =============================
  // Activity
  // =============================

  await prisma.activity.create({
    data: {
      title: "School Leadership Training",
      description: "Training student leaders.",
      status: "Planned",
      startDate: new Date("2026-08-01"),
      endDate: new Date("2026-08-05"),
      projectId: project.id,
    },
  });

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });