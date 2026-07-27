import prisma from "../lib/prisma";

async function main() {

  const programme =
    await prisma.programme.findFirst({
      where: {
        name: "Mental Health Resilience Programme"
      },
      include: {
        projects: {
          include: {
            activities: true,
            beneficiaries: true
          }
        }
      }
    });


  if (!programme) {
    throw new Error("Programme not found");
  }


  console.log(
    JSON.stringify(
      programme.projects.map(p => ({
        id: p.id,
        name: p.name,
        activities: p.activities.length,
        beneficiaries: p.beneficiaries.length
      })),
      null,
      2
    )
  );

}

main()
.finally(() => prisma.$disconnect());