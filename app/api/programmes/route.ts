import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const programmes = await prisma.programme.findMany({
      include: {
        directorate: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
        _count: {
          select: {
            projects: true,
            indicators: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(programmes);

  } catch (error) {
    console.error("PROGRAMMES API ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch programmes",
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const programme = await prisma.programme.create({
      data: {
        code: body.code || null,
        name: body.name,
        theme: body.theme || null,
        description: body.description || null,
        status: body.status || "ACTIVE",
        startYear: Number(body.startYear),
        endYear: Number(body.endYear),
        budgetCeiling: body.budgetCeiling
          ? Number(body.budgetCeiling)
          : null,
        currency: body.currency || "ZMW",
        directorateId: body.directorateId,
      },
      include: {
        directorate: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(programme);

  } catch (error) {
    console.error("CREATE PROGRAMME ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to create programme",
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}
