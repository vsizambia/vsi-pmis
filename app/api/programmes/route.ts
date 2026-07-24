import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const programmes = await prisma.programme.findMany({
    include: {
      directorate: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(programmes);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const programme = await prisma.programme.create({
      data: {
        name: body.name,
        description: body.description,
        startYear: Number(body.startYear),
        endYear: Number(body.endYear),
        directorateId: body.directorateId,
      },
      include: {
        directorate: true,
      },
    });

    return NextResponse.json(programme);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create programme." },
      { status: 500 }
    );
  }
}