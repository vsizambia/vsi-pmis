import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const directorates = await prisma.directorate.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(directorates);
  } catch (error) {
    console.error("DIRECTORATES GET ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch directorates" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.code || !body.name) {
      return NextResponse.json(
        { message: "Directorate code and name are required." },
        { status: 400 },
      );
    }

    const directorate = await prisma.directorate.create({
      data: {
        code: String(body.code).trim().toUpperCase(),
        name: String(body.name).trim(),
        description: body.description
          ? String(body.description).trim()
          : null,
      },
    });

    return NextResponse.json(directorate, { status: 201 });
  } catch (error) {
    console.error("CREATE DIRECTORATE ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to create directorate",
        error: String(error),
      },
      { status: 500 },
    );
  }
}
