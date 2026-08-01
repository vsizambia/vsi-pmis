-- Convert existing Project status values safely to enum

ALTER TABLE "Project"
ALTER COLUMN "status" DROP DEFAULT;

UPDATE "Project"
SET "status" = CASE
    WHEN UPPER("status") = 'PLANNED' THEN 'PLANNED'
    WHEN UPPER("status") = 'APPROVED' THEN 'APPROVED'
    WHEN UPPER("status") = 'ACTIVE' THEN 'ACTIVE'
    WHEN UPPER("status") = 'SUSPENDED' THEN 'SUSPENDED'
    WHEN UPPER("status") = 'COMPLETED' THEN 'COMPLETED'
    WHEN UPPER("status") = 'CLOSED' THEN 'CLOSED'
    WHEN UPPER("status") = 'CANCELLED' THEN 'CANCELLED'
    ELSE 'PLANNED'
END;

ALTER TABLE "Project"
ALTER COLUMN "status"
TYPE "ProjectStatus"
USING "status"::text::"ProjectStatus";

ALTER TABLE "Project"
ALTER COLUMN "status"
SET DEFAULT 'PLANNED'::"ProjectStatus";


CREATE TABLE "ProjectMilestone" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectMilestone_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "ProjectRisk" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "probability" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "mitigation" TEXT,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectRisk_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "ProjectIssue" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "resolution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectIssue_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "ProjectUpdate" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "achievements" TEXT,
    "challenges" TEXT,
    "nextSteps" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectUpdate_pkey" PRIMARY KEY ("id")
);


CREATE INDEX "ProjectMilestone_projectId_idx"
ON "ProjectMilestone"("projectId");

CREATE INDEX "ProjectRisk_projectId_idx"
ON "ProjectRisk"("projectId");

CREATE INDEX "ProjectIssue_projectId_idx"
ON "ProjectIssue"("projectId");

CREATE INDEX "ProjectUpdate_projectId_idx"
ON "ProjectUpdate"("projectId");


ALTER TABLE "ProjectMilestone"
ADD CONSTRAINT "ProjectMilestone_projectId_fkey"
FOREIGN KEY ("projectId") REFERENCES "Project"("id")
ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "ProjectRisk"
ADD CONSTRAINT "ProjectRisk_projectId_fkey"
FOREIGN KEY ("projectId") REFERENCES "Project"("id")
ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "ProjectIssue"
ADD CONSTRAINT "ProjectIssue_projectId_fkey"
FOREIGN KEY ("projectId") REFERENCES "Project"("id")
ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "ProjectUpdate"
ADD CONSTRAINT "ProjectUpdate_projectId_fkey"
FOREIGN KEY ("projectId") REFERENCES "Project"("id")
ON DELETE CASCADE ON UPDATE CASCADE;