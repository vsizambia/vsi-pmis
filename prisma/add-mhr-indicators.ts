import prisma from "../lib/prisma";

async function main() {

  const programme =
    await prisma.programme.findFirst({
      where: {
        name: "Mental Health Resilience Programme",
      },
    });


  if (!programme) {
    throw new Error(
      "Mental Health Resilience Programme not found"
    );
  }


  const indicators = [
    {
      name: "Students reached with mental health resilience training",
      baseline: "0",
      target: "10000",
      achieved: "0",
      programmeId: programme.id,
    },

    {
      name: "Secondary schools reached",
      baseline: "0",
      target: "200",
      achieved: "0",
      programmeId: programme.id,
    },

    {
      name: "Peer support volunteers trained",
      baseline: "0",
      target: "500",
      achieved: "0",
      programmeId: programme.id,
    },

    {
      name: "Mental health awareness sessions conducted",
      baseline: "0",
      target: "1000",
      achieved: "0",
      programmeId: programme.id,
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
      },

      create: indicator,

    });

  }


  console.log(
    "Mental Health Resilience Programme indicators added successfully"
  );

}


main()
.finally(() => prisma.$disconnect());