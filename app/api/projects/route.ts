import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  ProjectPriority,
  ProjectStatus,
  RiskLevel,
} from "@prisma/client";

function parseOptionalDate(value: unknown) {
  if (!value) return null;

  const date = new Date(String(value));

  return Number.isNaN(date.getTime())
    ? null
    : date;
}

function parseOptionalNumber(value: unknown) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : null;
}

function parseProgress(value: unknown) {
  const progress = Number(value ?? 0);

  if (!Number.isFinite(progress)) {
    return 0;
  }

  return Math.min(Math.max(progress, 0), 100);
}

function parseStatus(value: unknown): ProjectStatus {
  const status = String(value || "PLANNED");

  if (
    Object.values(ProjectStatus).includes(
      status as ProjectStatus,
    )
  ) {
    return status as ProjectStatus;
  }

  return ProjectStatus.PLANNED;
}

function parsePriority(value: unknown): ProjectPriority {
  const priority = String(value || "MEDIUM");

  if (
    Object.values(ProjectPriority).includes(
      priority as ProjectPriority,
    )
  ) {
    return priority as ProjectPriority;
  }

  return ProjectPriority.MEDIUM;
}

function parseRiskLevel(value: unknown): RiskLevel {
  const risk = String(value || "LOW");

  if (
    Object.values(RiskLevel).includes(
      risk as RiskLevel,
    )
  ) {
    return risk as RiskLevel;
  }

  return RiskLevel.LOW;
}

function projectData(body: Record<string, unknown>) {
  return {
    name: String(body.name || "").trim(),
    description: body.description
      ? String(body.description).trim()
      : null,

    referenceNo: body.referenceNo
      ? String(body.referenceNo).trim()
      : null,

    code: body.code
      ? String(body.code).trim()
      : null,

    programmeId: String(body.programmeId),

    status: parseStatus(body.status),
    priority: parsePriority(body.priority),
    riskLevel: parseRiskLevel(body.riskLevel),

    progress: parseProgress(body.progress),

    budget: parseOptionalNumber(body.budget),

    fundingSource: body.fundingSource
      ? String(body.fundingSource).trim()
      : null,

    donor: body.donor
      ? String(body.donor).trim()
      : null,

    projectManagerId:
      body.projectManagerId
        ? String(body.projectManagerId)
        : null,

    startDate: parseOptionalDate(body.startDate),
    endDate: parseOptionalDate(body.endDate),
  };
}

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
        expenditures: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error(
      "PROJECT FETCH ERROR:",
      error,
    );

    return NextResponse.json(
      {
        message: "Failed to fetch projects",
      },
      {
        status: 500,
      },
    );
  }
}

// CREATE PROJECT
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.programmeId) {
      return NextResponse.json(
        {
          message:
            "Project name and programme are required.",
        },
        {
          status: 400,
        },
      );
    }

    const data = projectData(body);

    if (!data.name) {
      return NextResponse.json(
        {
          message: "Project name is required.",
        },
        {
          status: 400,
        },
      );
    }

    const project = await prisma.project.create({
      data: {
        ...data,
        currency: "ZMW",
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

    return NextResponse.json(project, {
      status: 201,
    });
  } catch (error) {
    console.error(
      "PROJECT CREATION ERROR:",
      error,
    );

    return NextResponse.json(
      {
        message: "Failed to create project.",
        error: String(error),
      },
      {
        status: 500,
      },
    );
  }
}

// UPDATE PROJECT
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          message: "Project ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!body.name || !body.programmeId) {
      return NextResponse.json(
        {
          message:
            "Project name and programme are required.",
        },
        {
          status: 400,
        },
      );
    }

    const data = projectData(body);

    const project = await prisma.project.update({
      where: {
        id: String(body.id),
      },

      data,

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

    return NextResponse.json(project);
  } catch (error) {
    console.error(
      "PROJECT UPDATE ERROR:",
      error,
    );

    return NextResponse.json(
      {
        message: "Failed to update project.",
        error: String(error),
      },
      {
        status: 500,
      },
    );
  }
}

// DELETE PROJECT
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          message: "Project ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    await prisma.project.delete({
      where: {
        id: String(body.id),
      },
    });

    return NextResponse.json({
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error(
      "PROJECT DELETE ERROR:",
      error,
    );

    return NextResponse.json(
      {
        message: "Failed to delete project.",
        error: String(error),
      },
      {
        status: 500,
      },
    );
  }
}
