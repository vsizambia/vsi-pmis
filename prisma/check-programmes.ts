import "dotenv/config";
import prisma from "../lib/prisma";


async function main() {

  const programmes = await prisma.programme.findMany({
    include: {
      projects: true,
      indicators: true,
      directorate: true,
    },
    orderBy: {
      name: "asc",
    },
  });


  console.log(
    JSON.stringify(
      programmes.map((programme) => ({
        id: programme.id,
        name: programme.name,
        directorate: programme.directorate.name,
        projects: programme.projects.length,
        indicators: programme.indicators.length,
      })),
      null,
      2
    )
  );

}


main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });