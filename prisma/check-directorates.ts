import prisma from "../lib/prisma";

async function main() {
  const directorates = await prisma.directorate.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  console.log(JSON.stringify(directorates, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });