import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  request: Request,
  { params }: Context
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const directorate = await prisma.directorate.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        description: body.description,
      },
    });

    return NextResponse.json(directorate);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update directorate." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Context
) {
  try {
    const { id } = await params;

    await prisma.directorate.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Directorate deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete directorate." },
      { status: 500 }
    );
  }
}