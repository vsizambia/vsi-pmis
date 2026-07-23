import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const programme = await prisma.programme.create({
      data: {
        name: body.name,
        description: body.description,
        startYear: Number(body.startYear),
        endYear: Number(body.endYear),
        status: "Planning",
        directorateId: body.directorateId,
      },
    });


    return NextResponse.json(programme);

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to create programme" },
      { status: 500 }
    );

  }

}