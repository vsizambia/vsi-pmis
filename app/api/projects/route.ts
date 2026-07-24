import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const project = await prisma.project.create({
      data: {
        programmeId: body.programmeId,
        name: body.name,
        description: body.description || null,
        status: body.status || "Planned",
        budget: body.budget
          ? Number(body.budget)
          : null,
        startDate: body.startDate
          ? new Date(body.startDate)
          : null,
        endDate: body.endDate
          ? new Date(body.endDate)
          : null,
      },
    });

    return NextResponse.json(project, {
      status: 201,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create project",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  const projects = await prisma.project.findMany({
    include: {
      programme: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(projects);
}