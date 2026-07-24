import "dotenv/config";
import prisma from "./lib/prisma";

async function main() {
  const projects = await prisma.project.findMany();
  console.log(projects);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });