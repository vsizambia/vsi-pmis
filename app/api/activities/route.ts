import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// GET ALL ACTIVITIES
export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        project: {
          include: {
            programme: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(activities);

  } catch (error) {
    console.error("Activity fetch error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch activities",
      },
      {
        status: 500,
      }
    );
  }
}


// CREATE ACTIVITY
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const activity = await prisma.activity.create({
      data: {
        projectId: body.projectId,
        title: body.title,
        description: body.description || null,
        status: body.status || "Planned",
        startDate: body.startDate
          ? new Date(body.startDate)
          : null,
        endDate: body.endDate
          ? new Date(body.endDate)
          : null,
      },
    });

    return NextResponse.json(activity, {
      status: 201,
    });

  } catch (error) {
    console.error("Activity creation error:", error);

    return NextResponse.json(
      {
        message: "Failed to create activity",
      },
      {
        status: 500,
      }
    );
  }
}


// UPDATE ACTIVITY
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const activity = await prisma.activity.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        description: body.description || null,
        status: body.status,
        startDate: body.startDate
          ? new Date(body.startDate)
          : null,
        endDate: body.endDate
          ? new Date(body.endDate)
          : null,
      },
    });

    return NextResponse.json(activity);

  } catch (error) {
    console.error("Activity update error:", error);

    return NextResponse.json(
      {
        message: "Failed to update activity",
      },
      {
        status: 500,
      }
    );
  }
}