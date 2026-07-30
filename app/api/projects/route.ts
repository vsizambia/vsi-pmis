import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// GET ALL PROJECTS
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        programme: true,

        projectManager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        activities: true,
        beneficiaries: true,
        locations: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });


    return NextResponse.json(projects);


  } catch (error) {

    console.error("PROJECT FETCH ERROR:", error);


    return NextResponse.json(
      {
        message: "Failed to fetch projects",
      },
      {
        status: 500,
      }
    );
  }
}




// CREATE PROJECT
export async function POST(
  request: Request
) {

  try {

    const body = await request.json();


    if (
      !body.name ||
      !body.programmeId
    ) {

      return NextResponse.json(
        {
          message:
            "Project name and programme are required",
        },
        {
          status: 400,
        }
      );
    }



    const project = await prisma.project.create({

      data: {

        name: body.name,

        description:
          body.description || null,


        status:
          body.status || "Planned",


        programmeId:
          body.programmeId,


        budget:
          body.budget
            ? Number(body.budget)
            : null,


        currency:
          "ZMW",


        startDate:
          body.startDate
            ? new Date(body.startDate)
            : null,


        endDate:
          body.endDate
            ? new Date(body.endDate)
            : null,

      },


      include: {

        programme: true,

        projectManager: {

          select: {

            id: true,
            name: true,
            email: true,

          },

        },

      },

    });



    return NextResponse.json(
      project,
      {
        status: 201,
      }
    );



  } catch(error) {


    console.error(
      "PROJECT CREATION ERROR:",
      error
    );


    return NextResponse.json(
      {
        message:
          "Failed to create project",
        error:
          String(error),
      },
      {
        status:500,
      }
    );

  }

}






// UPDATE PROJECT
export async function PUT(
  request: Request
) {

  try {

    const body =
      await request.json();



    if (!body.id) {

      return NextResponse.json(
        {
          message:
            "Project ID is required",
        },
        {
          status:400,
        }
      );

    }




    const project =
      await prisma.project.update({

        where:{
          id: body.id,
        },


        data:{


          name:
            body.name,


          description:
            body.description || null,


          status:
            body.status,


          programmeId:
            body.programmeId,


          budget:
            body.budget
              ? Number(body.budget)
              : null,


          startDate:
            body.startDate
              ? new Date(body.startDate)
              : null,


          endDate:
            body.endDate
              ? new Date(body.endDate)
              : null,

        },



        include:{

          programme:true,


          projectManager:{

            select:{

              id:true,
              name:true,
              email:true,

            },

          },

        },

      });



    return NextResponse.json(project);



  } catch(error){


    console.error(
      "PROJECT UPDATE ERROR:",
      error
    );


    return NextResponse.json(

      {
        message:
          "Failed to update project",
        error:
          String(error),
      },

      {
        status:500,
      }

    );

  }

}





// DELETE PROJECT
export async function DELETE(
  request: Request
) {

  try {


    const body =
      await request.json();



    if (!body.id) {

      return NextResponse.json(
        {
          message:
            "Project ID is required",
        },
        {
          status:400,
        }
      );

    }



    await prisma.project.delete({

      where:{
        id:body.id,
      },

    });



    return NextResponse.json(
      {
        message:
          "Project deleted successfully",
      }
    );



  } catch(error){


    console.error(
      "PROJECT DELETE ERROR:",
      error
    );


    return NextResponse.json(

      {
        message:
          "Failed to delete project",
        error:
          String(error),
      },

      {
        status:500,
      }

    );

  }

}