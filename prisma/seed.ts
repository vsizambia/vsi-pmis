import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database...");

  // ==========================
  // ROLES
  // ==========================

  const adminRole = await prisma.role.upsert({
    where: {
      name: "Administrator",
    },
    update: {},
    create: {
      name: "Administrator",
    },
  });

  const programmeManagerRole = await prisma.role.upsert({
    where: {
      name: "Programme Manager",
    },
    update: {},
    create: {
      name: "Programme Manager",
    },
  });

  const officerRole = await prisma.role.upsert({
    where: {
      name: "Programme Officer",
    },
    update: {},
    create: {
      name: "Programme Officer",
    },
  });


  // ==========================
  // USERS
  // ==========================

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@vsi.org.zm",
    },
    update: {},
    create: {
      name: "System Administrator",
      email: "admin@vsi.org.zm",
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });


  // ==========================
  // DIRECTORATES
  // ==========================

  const programmesDirectorate = await prisma.directorate.upsert({
    where: {
      name: "Directorate of Programmes",
    },
    update: {},
    create: {
      name: "Directorate of Programmes",
      description:
        "Responsible for programme planning, implementation, monitoring and evaluation of VSI interventions.",
    },
  });


  // ==========================
  // PROGRAMMES
  // ==========================

  await prisma.programme.createMany({
    data: [
      {
        name: "Civic Leadership and Democratic Governance Programme",
        description:
          "Promotes civic awareness, democratic values, leadership development and citizen participation among young people and communities.",
        startYear: 2026,
        endYear: 2029,
        directorateId: programmesDirectorate.id,
      },
      {
        name: "Youth Empowerment Programme",
        description:
          "Builds youth capacity through leadership training, skills development and community engagement initiatives.",
        startYear: 2026,
        endYear: 2029,
        directorateId: programmesDirectorate.id,
      },
      {
        name: "Mental Health Resilience Programme",
        description:
          "Strengthens mental health awareness, resilience and wellbeing among students and communities.",
        startYear: 2026,
        endYear: 2029,
        directorateId: programmesDirectorate.id,
      },
      {
        name: "Community Development Programme",
        description:
          "Supports community-led initiatives that promote sustainable local development and social accountability.",
        startYear: 2026,
        endYear: 2029,
        directorateId: programmesDirectorate.id,
      },
    ],
    skipDuplicates: true,
  });


  console.log("✅ VSI Directorates and Programmes seeded successfully.");
  console.log("✅ Seed completed successfully.");
}


main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });