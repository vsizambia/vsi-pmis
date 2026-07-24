import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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