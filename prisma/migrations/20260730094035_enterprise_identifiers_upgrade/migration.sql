/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Indicator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Programme` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referenceNo]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ProgrammeStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'COMPLETED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNED', 'APPROVED', 'ACTIVE', 'SUSPENDED', 'COMPLETED', 'CLOSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ProjectPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "code" TEXT,
ADD COLUMN     "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT 'PLANNED';

-- AlterTable
ALTER TABLE "Directorate" ALTER COLUMN "code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Indicator" ADD COLUMN     "code" TEXT,
ADD COLUMN     "projectId" TEXT,
ADD COLUMN     "unit" TEXT;

-- AlterTable
ALTER TABLE "Programme" ADD COLUMN     "budgetCeiling" DOUBLE PRECISION,
ADD COLUMN     "code" TEXT,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'ZMW',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "theme" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "code" TEXT,
ADD COLUMN     "donor" TEXT,
ADD COLUMN     "fundingSource" TEXT,
ADD COLUMN     "priority" "ProjectPriority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "referenceNo" TEXT,
ADD COLUMN     "riskLevel" "RiskLevel" NOT NULL DEFAULT 'LOW',
ALTER COLUMN "status" SET DEFAULT 'PLANNED';

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "code" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Activity_code_key" ON "Activity"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Indicator_code_key" ON "Indicator"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Programme_code_key" ON "Programme"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Project_referenceNo_key" ON "Project"("referenceNo");

-- CreateIndex
CREATE UNIQUE INDEX "Project_code_key" ON "Project"("code");

-- AddForeignKey
ALTER TABLE "Indicator" ADD CONSTRAINT "Indicator_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
