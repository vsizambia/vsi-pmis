import prisma from "../lib/prisma";

async function main() {

  const duplicateIds = [
    "cms009v1800065c773lf6h0xn",
    "cms009v1800075c7755g3iovh",
    "cms00b1b50006in77mfn8xvfc",
    "cms00b1b50007in77cq1bnt65",
    "cms00p2u90006fz77vdg4s70i",
    "cms00p2u90007fz770mswdqnc",
  ];


  const deleted =
    await prisma.project.deleteMany({
      where:{
        id:{
          in: duplicateIds
        }
      }
    });


  console.log(
    `Deleted ${deleted.count} duplicate projects`
  );

}


main()
.finally(()=>prisma.$disconnect());