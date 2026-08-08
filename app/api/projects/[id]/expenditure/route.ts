import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function syncProjectSpent(projectId: string) {
  const result = await prisma.projectExpenditure.aggregate({
    where: {
      projectId,
      status: "RECORDED",
    },
    _sum: {
      amount: true,
    },
  });

  const spent = Number(result._sum.amount ?? 0);

  await prisma.project.update({
    where: { id: projectId },
    data: { spent },
  });

  return spent;
}

export async function GET(
  _request: Request,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    const project = await prisma.project.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }

    const expenditures = await prisma.projectExpenditure.findMany({
      where: { projectId: id },
      orderBy: [
        { transactionDate: "desc" },
        { createdAt: "desc" },
      ],
    });

    const spent = expenditures
      .filter((item) => item.status === "RECORDED")
      .reduce((sum, item) => sum + item.amount, 0);

    return NextResponse.json({
      expenditures,
      spent,
      transactionCount: expenditures.length,
    });
  } catch (error) {
    console.error("EXPENDITURE FETCH ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch project expenditure",
        error: String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (
      !body.amount ||
      Number(body.amount) <= 0 ||
      !body.category ||
      !body.description ||
      !body.transactionDate
    ) {
      return NextResponse.json(
        {
          message:
            "Transaction date, amount, category and description are required",
        },
        { status: 400 },
      );
    }

    const project = await prisma.project.findUnique({
      where: { id },
      select: {
        id: true,
        budget: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }

    const amount = Number(body.amount);

    const expenditure = await prisma.projectExpenditure.create({
      data: {
        projectId: id,
        transactionDate: new Date(body.transactionDate),
        amount,
        category: body.category,
        description: body.description,
        reference: body.reference || null,
        fundingSource: body.fundingSource || null,
        status: body.status || "RECORDED",
      },
    });

    const spent = await syncProjectSpent(id);

    return NextResponse.json(
      {
        expenditure,
        spent,
        budget: project.budget ?? 0,
        remainingBudget: Math.max(
          Number(project.budget ?? 0) - spent,
          0,
        ),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("EXPENDITURE CREATION ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to record expenditure",
        error: String(error),
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (!body.expenditureId) {
      return NextResponse.json(
        { message: "Expenditure ID is required" },
        { status: 400 },
      );
    }

    const expenditure = await prisma.projectExpenditure.update({
      where: {
        id: body.expenditureId,
        projectId: id,
      },
      data: {
        transactionDate: body.transactionDate
          ? new Date(body.transactionDate)
          : undefined,
        amount:
          body.amount !== undefined
            ? Number(body.amount)
            : undefined,
        category: body.category,
        description: body.description,
        reference: body.reference || null,
        fundingSource: body.fundingSource || null,
        status: body.status || "RECORDED",
      },
    });

    const spent = await syncProjectSpent(id);

    return NextResponse.json({
      expenditure,
      spent,
    });
  } catch (error) {
    console.error("EXPENDITURE UPDATE ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to update expenditure",
        error: String(error),
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (!body.expenditureId) {
      return NextResponse.json(
        { message: "Expenditure ID is required" },
        { status: 400 },
      );
    }

    await prisma.projectExpenditure.delete({
      where: {
        id: body.expenditureId,
        projectId: id,
      },
    });

    const spent = await syncProjectSpent(id);

    return NextResponse.json({
      message: "Expenditure deleted successfully",
      spent,
    });
  } catch (error) {
    console.error("EXPENDITURE DELETE ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to delete expenditure",
        error: String(error),
      },
      { status: 500 },
    );
  }
}
