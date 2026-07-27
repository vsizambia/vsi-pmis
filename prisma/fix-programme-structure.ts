import "dotenv/config";
import prisma from "../lib/prisma";


async function main() {

  const targetProgramme =
    await prisma.programme.findUnique({
      where: {
        name: "Civic Leadership and Democratic Governance Programme",
      },
    });


  const oldProgramme =
    await prisma.programme.findUnique({
      where: {
        name: "Mental Resilience and Civic Leadership",
      },
    });


  const oldDirectorate =
    await prisma.directorate.findUnique({
      where: {
        name: "Programmes",
      },
    });


  if (!targetProgramme || !oldProgramme) {
    throw new Error("Required programmes not found");
  }


  // Move project
  await prisma.project.updateMany({
    where: {
      programmeId: oldProgramme.id,
    },
    data: {
      programmeId: targetProgramme.id,
    },
  });


  // Move indicators
  await prisma.indicator.updateMany({
    where: {
      programmeId: oldProgramme.id,
    },
    data: {
      programmeId: targetProgramme.id,
    },
  });


  // Delete duplicate programme
  await prisma.programme.delete({
    where: {
      id: oldProgramme.id,
    },
  });


  // Delete old empty directorate
  if (oldDirectorate) {

    await prisma.directorate.delete({
      where: {
        id: oldDirectorate.id,
      },
    });

  }


  console.log("Programme structure cleaned successfully");

}


main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });