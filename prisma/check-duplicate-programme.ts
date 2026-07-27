import "dotenv/config";
import prisma from "../lib/prisma";


async function main() {

  const programme =
    await prisma.programme.findUnique({
      where: {
        name: "Mental Resilience and Civic Leadership",
      },
      include: {
        projects: true,
        indicators: true,
      },
    });


  console.log(
    JSON.stringify(programme, null, 2)
  );

}


main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });