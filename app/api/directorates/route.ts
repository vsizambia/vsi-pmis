import prisma from "@/lib/prisma";

export async function GET() {

  try {

    const directorates = await prisma.directorate.findMany({
      orderBy:{
        createdAt:"desc"
      }
    });


    return Response.json(directorates);


  } catch(error){

    console.error(error);

    return Response.json(
      {
        error:"Failed to fetch directorates"
      },
      {
        status:500
      }
    );

  }

}


export async function POST(request: Request){

  try{

    const body = await request.json();


    const directorate = await prisma.directorate.create({

      data:{
        name:body.name,
        description:body.description
      }

    });


    return Response.json(directorate);


  }catch(error){

    console.error(error);

    return Response.json(
      {
        error:"Failed to create directorate"
      },
      {
        status:500
      }
    );

  }

}